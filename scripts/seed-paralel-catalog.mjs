import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const catalogAssetsDir = path.join(publicDir, 'catalog-assets');
const mediaCatalogDir = path.join(rootDir, 'media', 'catalog', 'paralel');

function parseDotEnv(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((env, line) => {
      const separatorIndex = line.indexOf('=');
      if (separatorIndex === -1) {
        return env;
      }
      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
      return env;
    }, {});
}

async function loadDbConfig() {
  const envFile = await fs.readFile(path.join(rootDir, '.env'), 'utf8');
  const env = parseDotEnv(envFile);
  return {
    host: env.DB_HOST || 'localhost',
    port: Number(env.DB_PORT || 5432),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD
  };
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function copyProductAssets() {
  const assetMap = [
    {
      folder: 'dunk-low',
      sourceFolder: path.join(publicDir, 'dunk low'),
      files: ['ext.webp']
    },
    {
      folder: 'jordan-rm-4',
      sourceFolder: path.join(publicDir, 'jordan rm 4'),
      files: ['diag.webp', 'diagBack.webp', 'ext.webp', 'int.webp', 'suela.webp', 'top.webp']
    },
    {
      folder: 'lunar-roam',
      sourceFolder: path.join(publicDir, 'Lunar Roam'),
      files: ['diag.webp', 'backdiag.webp', 'int.webp']
    }
  ];

  for (const assetGroup of assetMap) {
    const publicDestinationFolder = path.join(catalogAssetsDir, assetGroup.folder);
    const mediaDestinationFolder = path.join(mediaCatalogDir, assetGroup.folder);
    await ensureDir(publicDestinationFolder);
    await ensureDir(mediaDestinationFolder);

    for (const fileName of assetGroup.files) {
      const sourceFile = path.join(assetGroup.sourceFolder, fileName);
      await fs.copyFile(sourceFile, path.join(publicDestinationFolder, fileName));
      await fs.copyFile(sourceFile, path.join(mediaDestinationFolder, fileName));
    }
  }
}

async function ensureAttribute(client, config) {
  const existing = await client.query(
    'SELECT attribute_id FROM attribute WHERE attribute_code = $1',
    [config.code]
  );

  if (existing.rowCount > 0) {
    const attributeId = existing.rows[0].attribute_id;
    await client.query(
      `UPDATE attribute
       SET attribute_name = $2,
           type = $3,
           is_required = $4,
           display_on_frontend = $5,
           sort_order = $6,
           is_filterable = $7
       WHERE attribute_id = $1`,
      [
        attributeId,
        config.name,
        config.type ?? 'select',
        false,
        true,
        config.sortOrder,
        config.filterable ?? true
      ]
    );
    return attributeId;
  }

  const inserted = await client.query(
    `INSERT INTO attribute (
      attribute_code,
      attribute_name,
      type,
      is_required,
      display_on_frontend,
      sort_order,
      is_filterable
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING attribute_id`,
    [
      config.code,
      config.name,
      config.type ?? 'select',
      false,
      true,
      config.sortOrder,
      config.filterable ?? true
    ]
  );

  return inserted.rows[0].attribute_id;
}

async function ensureAttributeGroupLink(client, attributeId, groupId = 1) {
  const existing = await client.query(
    'SELECT attribute_group_link_id FROM attribute_group_link WHERE attribute_id = $1 AND group_id = $2',
    [attributeId, groupId]
  );

  if (existing.rowCount === 0) {
    await client.query(
      'INSERT INTO attribute_group_link (attribute_id, group_id) VALUES ($1, $2)',
      [attributeId, groupId]
    );
  }
}

async function ensureAttributeOption(client, attributeId, attributeCode, optionText) {
  const existing = await client.query(
    'SELECT attribute_option_id FROM attribute_option WHERE attribute_id = $1 AND option_text = $2',
    [attributeId, optionText]
  );

  if (existing.rowCount > 0) {
    return existing.rows[0].attribute_option_id;
  }

  const inserted = await client.query(
    `INSERT INTO attribute_option (attribute_id, attribute_code, option_text)
     VALUES ($1, $2, $3)
     RETURNING attribute_option_id`,
    [attributeId, attributeCode, optionText]
  );

  return inserted.rows[0].attribute_option_id;
}

async function upsertCategory(client, categoryId, config) {
  await client.query(
    `UPDATE category
     SET status = TRUE,
         parent_id = NULL,
         include_in_nav = TRUE,
         position = $2,
         show_products = TRUE,
         updated_at = NOW()
     WHERE category_id = $1`,
    [categoryId, config.position]
  );

  await client.query(
    `UPDATE category_description
     SET name = $2,
         short_description = $3,
         description = $4,
         image = $5,
         meta_title = $6,
         meta_keywords = $7,
         meta_description = $8,
         url_key = $9
     WHERE category_description_category_id = $1`,
    [
      categoryId,
      config.name,
      config.shortDescription,
      config.description,
      config.image,
      config.name,
      config.metaKeywords,
      config.shortDescription,
      config.urlKey
    ]
  );

  const entity = await client.query('SELECT uuid FROM category WHERE category_id = $1', [categoryId]);
  const categoryUuid = entity.rows[0].uuid;

  await client.query(
    'DELETE FROM url_rewrite WHERE entity_uuid = $1 AND entity_type = $2',
    [categoryUuid, 'category']
  );

  await client.query(
    `INSERT INTO url_rewrite (language, request_path, target_path, entity_uuid, entity_type)
     VALUES ($1, $2, $3, $4, $5)`,
    ['en', `/${config.urlKey}`, `/category/${categoryUuid}`, categoryUuid, 'category']
  );

  return {
    categoryId,
    uuid: categoryUuid,
    urlKey: config.urlKey
  };
}

async function findProductBySku(client, sku) {
  const result = await client.query(
    'SELECT product_id, uuid FROM product WHERE sku = $1',
    [sku]
  );
  return result.rows[0] || null;
}

async function upsertProduct(client, productConfig, attributeCatalog) {
  let productRecord = await findProductBySku(client, productConfig.sku);

  if (!productRecord && productConfig.legacyProductId) {
    const legacy = await client.query(
      'SELECT product_id, uuid FROM product WHERE product_id = $1',
      [productConfig.legacyProductId]
    );
    productRecord = legacy.rows[0] || null;
  }

  if (!productRecord) {
    const inserted = await client.query(
      `INSERT INTO product (
        type,
        variant_group_id,
        visibility,
        group_id,
        sku,
        price,
        weight,
        tax_class,
        status,
        category_id,
        no_shipping_required
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING product_id, uuid`,
      [
        'simple',
        null,
        true,
        1,
        productConfig.sku,
        productConfig.price,
        productConfig.weight,
        1,
        true,
        productConfig.categoryId,
        false
      ]
    );
    productRecord = inserted.rows[0];
  }

  await client.query(
    `UPDATE product
     SET type = $2,
         variant_group_id = NULL,
         visibility = TRUE,
         group_id = 1,
         sku = $3,
         price = $4,
         weight = $5,
         tax_class = 1,
         status = TRUE,
         category_id = $6,
         no_shipping_required = FALSE,
         updated_at = NOW()
     WHERE product_id = $1`,
    [
      productRecord.product_id,
      'simple',
      productConfig.sku,
      productConfig.price,
      productConfig.weight,
      productConfig.categoryId
    ]
  );

  const descriptionExists = await client.query(
    'SELECT product_description_id FROM product_description WHERE product_description_product_id = $1',
    [productRecord.product_id]
  );

  if (descriptionExists.rowCount > 0) {
    await client.query(
      `UPDATE product_description
       SET name = $2,
           description = $3,
           short_description = $4,
           url_key = $5,
           meta_title = $6,
           meta_description = $7,
           meta_keywords = $8
       WHERE product_description_product_id = $1`,
      [
        productRecord.product_id,
        productConfig.name,
        productConfig.description,
        productConfig.shortDescription,
        productConfig.urlKey,
        productConfig.name,
        productConfig.shortDescription,
        productConfig.metaKeywords
      ]
    );
  } else {
    await client.query(
      `INSERT INTO product_description (
        product_description_product_id,
        name,
        description,
        short_description,
        url_key,
        meta_title,
        meta_description,
        meta_keywords
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        productRecord.product_id,
        productConfig.name,
        productConfig.description,
        productConfig.shortDescription,
        productConfig.urlKey,
        productConfig.name,
        productConfig.shortDescription,
        productConfig.metaKeywords
      ]
    );
  }

  const inventoryExists = await client.query(
    'SELECT product_inventory_id FROM product_inventory WHERE product_inventory_product_id = $1',
    [productRecord.product_id]
  );

  if (inventoryExists.rowCount > 0) {
    await client.query(
      `UPDATE product_inventory
       SET qty = $2,
           manage_stock = TRUE,
           stock_availability = TRUE
       WHERE product_inventory_product_id = $1`,
      [productRecord.product_id, productConfig.qty]
    );
  } else {
    await client.query(
      `INSERT INTO product_inventory (
        product_inventory_product_id,
        qty,
        manage_stock,
        stock_availability
      )
      VALUES ($1, $2, TRUE, TRUE)`,
      [productRecord.product_id, productConfig.qty]
    );
  }

  await client.query(
    'DELETE FROM product_image WHERE product_image_product_id = $1',
    [productRecord.product_id]
  );

  for (const [index, imagePath] of productConfig.images.entries()) {
    await client.query(
      `INSERT INTO product_image (
        product_image_product_id,
        origin_image,
        thumb_image,
        listing_image,
        single_image,
        is_main
      )
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [productRecord.product_id, imagePath, imagePath, imagePath, imagePath, index === 0]
    );
  }

  await client.query(
    'DELETE FROM product_attribute_value_index WHERE product_id = $1',
    [productRecord.product_id]
  );

  for (const attributeValue of productConfig.attributes) {
    const attributeData = attributeCatalog[attributeValue.code];
    const optionId = await ensureAttributeOption(
      client,
      attributeData.attributeId,
      attributeValue.code,
      attributeValue.value
    );

    await client.query(
      `INSERT INTO product_attribute_value_index (
        product_id,
        attribute_id,
        option_id,
        option_text
      )
      VALUES ($1, $2, $3, $4)`,
      [productRecord.product_id, attributeData.attributeId, optionId, attributeValue.value]
    );
  }

  await client.query(
    'DELETE FROM url_rewrite WHERE entity_uuid = $1 AND entity_type = $2',
    [productRecord.uuid, 'product']
  );

  await client.query(
    `INSERT INTO url_rewrite (language, request_path, target_path, entity_uuid, entity_type)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      'en',
      `/${productConfig.categoryUrlKey}/${productConfig.urlKey}`,
      `/product/${productRecord.uuid}`,
      productRecord.uuid,
      'product'
    ]
  );

  return {
    productId: productRecord.product_id,
    uuid: productRecord.uuid,
    url: `/${productConfig.categoryUrlKey}/${productConfig.urlKey}`
  };
}

async function removeObsoleteProductRows(client, keepSkus) {
  const products = await client.query('SELECT product_id, uuid, sku FROM product');
  const obsolete = products.rows.filter((product) => !keepSkus.has(product.sku));

  for (const product of obsolete) {
    await client.query(
      'DELETE FROM url_rewrite WHERE entity_uuid = $1 AND entity_type = $2',
      [product.uuid, 'product']
    );
    await client.query(
      'DELETE FROM product_attribute_value_index WHERE product_id = $1',
      [product.product_id]
    );
    await client.query(
      'DELETE FROM product_image WHERE product_image_product_id = $1',
      [product.product_id]
    );
    await client.query(
      'DELETE FROM product_inventory WHERE product_inventory_product_id = $1',
      [product.product_id]
    );
    await client.query(
      'DELETE FROM product_description WHERE product_description_product_id = $1',
      [product.product_id]
    );
    await client.query('DELETE FROM product WHERE product_id = $1', [product.product_id]);
  }
}

async function main() {
  await copyProductAssets();
  const dbConfig = await loadDbConfig();
  const client = new pg.Client(dbConfig);

  const categories = [
    {
      categoryId: 3,
      name: 'Hombre',
      urlKey: 'hombre',
      position: 1,
      shortDescription: 'Tenis seleccionados para hombre, listos para validar la PLP real.',
      description:
        'Curaduria de modelos para hombre con foco en siluetas urbanas, basket y running premium.',
      image: '/brand-assets/nike-banner.jpeg',
      metaKeywords: 'tenis hombre, nike, jordan, paralel'
    },
    {
      categoryId: 2,
      name: 'Mujer',
      urlKey: 'mujer',
      position: 2,
      shortDescription: 'Selecciones para mujer con enfoque lifestyle y catalogo administrable.',
      description:
        'Categoria pensada para validar navegacion, filtros y detalle de producto con referencias reales.',
      image: '/brand-assets/adidas-banner.jpeg',
      metaKeywords: 'tenis mujer, dunk low, paralel'
    },
    {
      categoryId: 1,
      name: 'Ninos',
      urlKey: 'ninos',
      position: 3,
      shortDescription: 'Categoria reservada para futuras referencias infantiles.',
      description:
        'Esta categoria queda lista en navegacion para cuando cargues inventario infantil desde el admin.',
      image: '/brand-assets/adidas-banner.jpeg',
      metaKeywords: 'tenis ninos, paralel'
    },
    {
      categoryId: 4,
      name: 'Deportes',
      urlKey: 'deportes',
      position: 4,
      shortDescription: 'Running, basket y siluetas tecnicas para validar la categoria editorial.',
      description:
        'Ruta preparada para agrupar productos por deporte, tecnologia y lenguaje de uso.',
      image: '/brand-assets/nike-banner.jpeg',
      metaKeywords: 'tenis running, deportes, paralel'
    }
  ];

  const products = [
    {
      legacyProductId: 1,
      sku: 'jordan-rm-4-black-red',
      name: 'Jordan RM 4 Black Red',
      urlKey: 'jordan-rm-4-black-red',
      price: 689900,
      weight: 1.3,
      qty: 6,
      categoryId: 3,
      categoryUrlKey: 'hombre',
      shortDescription: 'Silueta Jordan para rotacion diaria con lectura basket y presencia premium.',
      description:
        '<p>Jordan RM 4 mezcla lenguaje de cancha y calle en una silueta firme, con paneles tecnicos y perfil agresivo.</p><p>Este producto se usa aqui para validar galeria real, categoria hombre y una PDP con mejor contexto comercial.</p>',
      metaKeywords: 'jordan rm 4, hombre, basket',
      images: [
        '/assets/catalog/paralel/jordan-rm-4/diag.webp',
        '/assets/catalog/paralel/jordan-rm-4/diagBack.webp',
        '/assets/catalog/paralel/jordan-rm-4/ext.webp',
        '/assets/catalog/paralel/jordan-rm-4/int.webp',
        '/assets/catalog/paralel/jordan-rm-4/suela.webp',
        '/assets/catalog/paralel/jordan-rm-4/top.webp'
      ],
      attributes: [
        { code: 'brand', value: 'Jordan' },
        { code: 'sport', value: 'Basketball' },
        { code: 'gender', value: 'Hombre' },
        { code: 'material', value: 'Mesh y sintetico' },
        { code: 'color', value: 'Black' }
      ]
    },
    {
      legacyProductId: 2,
      sku: 'nike-dunk-low-white-black',
      name: 'Nike Dunk Low White Black',
      urlKey: 'nike-dunk-low-white-black',
      price: 629900,
      weight: 1.1,
      qty: 8,
      categoryId: 2,
      categoryUrlKey: 'mujer',
      shortDescription: 'Una referencia limpia para validar una PLP femenina con producto real.',
      description:
        '<p>Nike Dunk Low entra como referencia lifestyle para categoria mujer, con lectura clasica y rotacion facil.</p><p>La carpeta recibida solo trae una imagen, pero ya sirve para comprobar URL, detalle de producto y alta en admin.</p>',
      metaKeywords: 'dunk low, mujer, nike',
      images: ['/assets/catalog/paralel/dunk-low/ext.webp'],
      attributes: [
        { code: 'brand', value: 'Nike' },
        { code: 'sport', value: 'Lifestyle' },
        { code: 'gender', value: 'Mujer' },
        { code: 'material', value: 'Cuero y sintetico' },
        { code: 'color', value: 'White' }
      ]
    },
    {
      sku: 'nike-lunar-roam-grey-black',
      name: 'Nike Lunar Roam Grey Black',
      urlKey: 'nike-lunar-roam-grey-black',
      price: 719900,
      weight: 1.0,
      qty: 5,
      categoryId: 4,
      categoryUrlKey: 'deportes',
      shortDescription: 'Running y confort para validar la categoria deportes con una ficha visible.',
      description:
        '<p>Nike Lunar Roam aterriza la categoria deportes con una lectura mas tecnica y orientada a running urbano.</p><p>Esta referencia permite comprobar galeria, breadcrumbs y PDP usando tus propios assets locales.</p>',
      metaKeywords: 'lunar roam, running, deportes',
      images: [
        '/assets/catalog/paralel/lunar-roam/diag.webp',
        '/assets/catalog/paralel/lunar-roam/backdiag.webp',
        '/assets/catalog/paralel/lunar-roam/int.webp'
      ],
      attributes: [
        { code: 'brand', value: 'Nike' },
        { code: 'sport', value: 'Running' },
        { code: 'gender', value: 'Unisex' },
        { code: 'material', value: 'Mesh tecnico' },
        { code: 'color', value: 'Black' }
      ]
    }
  ];

  const attributeDefinitions = [
    { code: 'color', name: 'Color', sortOrder: 10, filterable: true },
    { code: 'size', name: 'Size-Shoe', sortOrder: 20, filterable: true },
    { code: 'brand', name: 'Brand', sortOrder: 30, filterable: true },
    { code: 'sport', name: 'Sport', sortOrder: 40, filterable: true },
    { code: 'gender', name: 'Gender', sortOrder: 50, filterable: true },
    { code: 'material', name: 'Material', sortOrder: 60, filterable: false }
  ];

  try {
    await client.connect();
    await client.query('BEGIN');

    const attributeCatalog = {};
    for (const attributeDefinition of attributeDefinitions) {
      const attributeId = await ensureAttribute(client, attributeDefinition);
      await ensureAttributeGroupLink(client, attributeId);
      attributeCatalog[attributeDefinition.code] = { attributeId };
    }

    for (const category of categories) {
      await upsertCategory(client, category.categoryId, category);
    }

    const keepSkus = new Set(products.map((product) => product.sku));
    await removeObsoleteProductRows(client, keepSkus);

    const createdProducts = [];
    for (const product of products) {
      const created = await upsertProduct(client, product, attributeCatalog);
      createdProducts.push(created);
    }

    await client.query('COMMIT');

    console.log('Categorias actualizadas:');
    for (const category of categories) {
      console.log(`- /${category.urlKey}`);
    }

    console.log('\nProductos cargados:');
    for (const product of createdProducts) {
      console.log(`- ${product.url}`);
    }
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

await main();
