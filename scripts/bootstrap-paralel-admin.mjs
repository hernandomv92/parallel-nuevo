import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const rootDir = process.cwd();

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

async function ensureAttribute(client, config) {
  const existing = await client.query(
    'SELECT attribute_id FROM attribute WHERE attribute_code = $1',
    [config.code]
  );

  if (existing.rowCount > 0) {
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
        existing.rows[0].attribute_id,
        config.name,
        config.type,
        false,
        true,
        config.sortOrder,
        config.filterable
      ]
    );

    return existing.rows[0].attribute_id;
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
      config.type,
      false,
      true,
      config.sortOrder,
      config.filterable
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

  if (existing.rowCount === 0) {
    await client.query(
      `INSERT INTO attribute_option (attribute_id, attribute_code, option_text)
       VALUES ($1, $2, $3)`,
      [attributeId, attributeCode, optionText]
    );
  }
}

async function ensureCollection(client, config) {
  const existing = await client.query('SELECT collection_id FROM collection WHERE code = $1', [
    config.code
  ]);

  if (existing.rowCount > 0) {
    await client.query(
      `UPDATE collection
       SET name = $2,
           description = $3,
           updated_at = NOW()
       WHERE collection_id = $1`,
      [existing.rows[0].collection_id, config.name, config.description]
    );

    return existing.rows[0].collection_id;
  }

  const inserted = await client.query(
    `INSERT INTO collection (name, description, code)
     VALUES ($1, $2, $3)
     RETURNING collection_id`,
    [config.name, config.description, config.code]
  );

  return inserted.rows[0].collection_id;
}

function buildCmsContent(title, paragraphs) {
  return JSON.stringify([
    {
      size: 1,
      columns: [
        {
          size: 1,
          data: {
            blocks: [
              { type: 'header', data: { text: title, level: 2 } },
              ...paragraphs.map((text) => ({
                type: 'paragraph',
                data: { text }
              }))
            ]
          }
        }
      ]
    }
  ]);
}

async function ensureCmsPage(client, config) {
  const existing = await client.query(
    `SELECT p.cms_page_id
     FROM cms_page p
     INNER JOIN cms_page_description d
       ON d.cms_page_description_cms_page_id = p.cms_page_id
     WHERE d.url_key = $1`,
    [config.urlKey]
  );

  const content = buildCmsContent(config.name, config.paragraphs);

  if (existing.rowCount > 0) {
    const cmsPageId = existing.rows[0].cms_page_id;

    await client.query(
      `UPDATE cms_page
       SET status = TRUE,
           updated_at = NOW()
       WHERE cms_page_id = $1`,
      [cmsPageId]
    );

    await client.query(
      `UPDATE cms_page_description
       SET name = $2,
           content = $3,
           meta_title = $4,
           meta_keywords = $5,
           meta_description = $6
       WHERE cms_page_description_cms_page_id = $1`,
      [cmsPageId, config.name, content, config.name, config.metaKeywords, config.metaDescription]
    );

    return cmsPageId;
  }

  const page = await client.query(
    `INSERT INTO cms_page (status)
     VALUES (TRUE)
     RETURNING cms_page_id`,
    []
  );

  const cmsPageId = page.rows[0].cms_page_id;

  await client.query(
    `INSERT INTO cms_page_description (
      cms_page_description_cms_page_id,
      url_key,
      name,
      content,
      meta_title,
      meta_keywords,
      meta_description
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      cmsPageId,
      config.urlKey,
      config.name,
      content,
      config.name,
      config.metaKeywords,
      config.metaDescription
    ]
  );

  return cmsPageId;
}

async function ensureProductCollection(client, sku, collectionCode) {
  const product = await client.query('SELECT product_id FROM product WHERE sku = $1', [sku]);
  const collection = await client.query('SELECT collection_id FROM collection WHERE code = $1', [
    collectionCode
  ]);

  if (product.rowCount === 0 || collection.rowCount === 0) {
    return;
  }

  const existing = await client.query(
    `SELECT product_collection_id
     FROM product_collection
     WHERE product_id = $1 AND collection_id = $2`,
    [product.rows[0].product_id, collection.rows[0].collection_id]
  );

  if (existing.rowCount === 0) {
    await client.query(
      `INSERT INTO product_collection (collection_id, product_id)
       VALUES ($1, $2)`,
      [collection.rows[0].collection_id, product.rows[0].product_id]
    );
  }
}

async function ensureWidget(client, config) {
  const existing = await client.query(
    'SELECT widget_id FROM widget WHERE name = $1 AND type = $2',
    [config.name, config.type]
  );

  if (existing.rowCount > 0) {
    await client.query(
      `UPDATE widget
       SET route = $2::jsonb,
           area = $3::jsonb,
           sort_order = $4,
           settings = $5::jsonb,
           status = $6,
           updated_at = NOW()
       WHERE widget_id = $1`,
      [
        existing.rows[0].widget_id,
        JSON.stringify(config.route),
        JSON.stringify(config.area),
        config.sortOrder,
        JSON.stringify(config.settings),
        config.status
      ]
    );

    return existing.rows[0].widget_id;
  }

  const inserted = await client.query(
    `INSERT INTO widget (
      name,
      type,
      route,
      area,
      sort_order,
      settings,
      status
    )
    VALUES ($1, $2, $3::jsonb, $4::jsonb, $5, $6::jsonb, $7)
    RETURNING widget_id`,
    [
      config.name,
      config.type,
      JSON.stringify(config.route),
      JSON.stringify(config.area),
      config.sortOrder,
      JSON.stringify(config.settings),
      config.status
    ]
  );

  return inserted.rows[0].widget_id;
}

function buildEditorRows(title, paragraphs, ctaText, ctaUrl) {
  const blocks = [
    { type: 'header', data: { text: title, level: 2 } },
    ...paragraphs.map((text) => ({
      type: 'paragraph',
      data: { text }
    }))
  ];

  if (ctaText && ctaUrl) {
    blocks.push({
      type: 'paragraph',
      data: {
        text: `<a href="${ctaUrl}">${ctaText}</a>`
      }
    });
  }

  return JSON.stringify([
    {
      size: 1,
      columns: [
        {
          size: 1,
          data: {
            blocks
          }
        }
      ]
    }
  ]);
}

const attributeDefinitions = [
  {
    code: 'brand',
    name: 'Marca',
    type: 'select',
    sortOrder: 10,
    filterable: true,
    options: ['Nike', 'Adidas', 'Jordan', 'On']
  },
  {
    code: 'gender',
    name: 'Genero',
    type: 'select',
    sortOrder: 20,
    filterable: true,
    options: ['Hombre', 'Mujer', 'Unisex', 'Ninos']
  },
  {
    code: 'sport',
    name: 'Deporte',
    type: 'select',
    sortOrder: 30,
    filterable: true,
    options: ['Lifestyle', 'Running', 'Basketball', 'Futbol', 'Training']
  },
  {
    code: 'color',
    name: 'Color',
    type: 'select',
    sortOrder: 40,
    filterable: true,
    options: ['Black', 'White', 'Grey', 'Red', 'Orange']
  },
  {
    code: 'size',
    name: 'Talla',
    type: 'select',
    sortOrder: 50,
    filterable: true,
    options: ['36', '37', '38', '39', '40', '41', '42', '43']
  },
  {
    code: 'material',
    name: 'Material',
    type: 'select',
    sortOrder: 60,
    filterable: true,
    options: ['Mesh', 'Leather', 'Synthetic', 'Textile']
  },
  {
    code: 'promo_state',
    name: 'Estado comercial',
    type: 'select',
    sortOrder: 70,
    filterable: true,
    options: ['Nuevo ingreso', 'Drop activo', 'Rotacion estable']
  }
];

const collections = [
  {
    code: 'nike',
    name: 'Nike',
    description: 'Coleccion editorial para referencias Nike.'
  },
  {
    code: 'jordan',
    name: 'Jordan',
    description: 'Coleccion editorial para drops y siluetas Jordan.'
  },
  {
    code: 'running',
    name: 'Running',
    description: 'Coleccion para running, tecnologia y uso deportivo.'
  },
  {
    code: 'nuevos-ingresos',
    name: 'Nuevos ingresos',
    description: 'Coleccion para entradas recientes del catalogo.'
  },
  {
    code: 'street-rotation',
    name: 'Street rotation',
    description: 'Coleccion para lifestyle y rotacion de marca.'
  }
];

const cmsPages = [
  {
    urlKey: 'envios',
    name: 'Envios',
    metaKeywords: 'envios, paralel store, colombia',
    metaDescription: 'Cobertura, tiempos y confirmacion de envios.',
    paragraphs: [
      'Usa esta pagina para dejar clara la cobertura, el proceso de confirmacion y la forma en que se informa el despacho al cliente.',
      'No prometas tiempos que no puedas sostener. El objetivo es reducir friccion antes del pedido.'
    ]
  },
  {
    urlKey: 'cambios-y-devoluciones',
    name: 'Cambios y devoluciones',
    metaKeywords: 'cambios, devoluciones, paralel store',
    metaDescription: 'Politica base para cambios y devoluciones.',
    paragraphs: [
      'Aqui debe vivir una politica simple sobre condiciones del producto, tiempos de solicitud y canales de atencion.',
      'La pagina existe para quitar incertidumbre comercial y evitar manejar estas reglas solo por WhatsApp.'
    ]
  },
  {
    urlKey: 'guia-de-tallas',
    name: 'Guia de tallas',
    metaKeywords: 'tallas, tenis, paralel store',
    metaDescription: 'Guia base para orientar la eleccion de talla.',
    paragraphs: [
      'Esta pagina debe ayudar a resolver dudas de horma, talla habitual y diferencias entre siluetas.',
      'Si una marca o referencia necesita una aclaracion especial, sumala aqui antes que repetirla producto por producto.'
    ]
  },
  {
    urlKey: 'faq',
    name: 'FAQ',
    metaKeywords: 'faq, preguntas frecuentes, paralel store',
    metaDescription: 'Preguntas frecuentes para soporte comercial y operativo.',
    paragraphs: [
      'Agrupa preguntas sobre stock, medios de pago, tiempos, envios y autenticidad.',
      'La idea es reducir mensajes repetidos y dejar una base de soporte que luego pueda crecer.'
    ]
  },
  {
    urlKey: 'terminos-y-condiciones',
    name: 'Terminos y condiciones',
    metaKeywords: 'terminos, condiciones, paralel store',
    metaDescription: 'Pagina base de terminos y condiciones.',
    paragraphs: [
      'Esta pagina debe concentrar condiciones generales de uso, alcance comercial y reglas legales basicas.',
      'Aunque el texto definitivo lo revise negocio o asesor legal, la estructura ya debe existir desde admin.'
    ]
  },
  {
    urlKey: 'privacidad',
    name: 'Privacidad',
    metaKeywords: 'privacidad, datos, paralel store',
    metaDescription: 'Pagina base de privacidad y tratamiento de datos.',
    paragraphs: [
      'Aqui debe quedar visible como se usan datos de contacto, pedidos y conversaciones comerciales.',
      'Es una base importante para dar confianza y preparar el sitio para una operacion formal.'
    ]
  }
];

const productCollectionLinks = [
  { sku: 'nike-dunk-low-white-black', collections: ['nike', 'nuevos-ingresos', 'street-rotation'] },
  { sku: 'jordan-rm-4-black-red', collections: ['jordan', 'street-rotation'] },
  { sku: 'nike-lunar-roam-grey-black', collections: ['nike', 'running', 'nuevos-ingresos'] }
];

const widgets = [
  {
    name: 'Home editorial lead',
    type: 'text_block',
    route: ['homepage'],
    area: ['homepageEditorialLead'],
    sortOrder: 10,
    status: true,
    settings: {
      className:
        'rounded-[28px] border border-neutral-200 bg-[#1232d3] px-8 py-9 text-white [&_h2]:text-3xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight [&_p]:mt-4 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-white/82 [&_a]:inline-flex [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:bg-white [&_a]:px-5 [&_a]:py-3 [&_a]:text-[12px] [&_a]:font-black [&_a]:uppercase [&_a]:tracking-[0.24em] [&_a]:text-black',
      text: buildEditorRows(
        'Operacion lista para mover narrativa',
        [
          'Este bloque ya vive como widget. Puedes reescribir mensajes, prioridades comerciales y CTA sin tocar el theme.',
          'La idea de esta fase es dejar editable el contenido que cambia mas seguido y mantener en codigo solo la estructura premium del storefront.'
        ],
        'Ver widgets en admin',
        '/admin/widgets'
      )
    }
  },
  {
    name: 'Home nuevos ingresos',
    type: 'collection_products',
    route: ['homepage'],
    area: ['homepageFeaturedCollections'],
    sortOrder: 10,
    status: true,
    settings: {
      collection: 'nuevos-ingresos',
      count: 4,
      countPerRow: 4
    }
  },
  {
    name: 'Home street rotation',
    type: 'collection_products',
    route: ['homepage'],
    area: ['homepageFeaturedCollections'],
    sortOrder: 20,
    status: true,
    settings: {
      collection: 'street-rotation',
      count: 4,
      countPerRow: 4
    }
  },
  {
    name: 'Home operational banner',
    type: 'banner',
    route: ['homepage'],
    area: ['homepageOperationalBanner'],
    sortOrder: 10,
    status: true,
    settings: {
      src: '/brand-assets/adidas-banner.jpeg',
      alignment: 'center',
      width: 2400,
      height: 1100,
      alt: 'Banner editorial Paralel Store'
    }
  }
];

async function main() {
  const dbConfig = await loadDbConfig();
  const client = new pg.Client(dbConfig);

  await client.connect();

  try {
    await client.query('BEGIN');

    for (const definition of attributeDefinitions) {
      const attributeId = await ensureAttribute(client, definition);
      await ensureAttributeGroupLink(client, attributeId);

      for (const option of definition.options) {
        await ensureAttributeOption(client, attributeId, definition.code, option);
      }
    }

    for (const collection of collections) {
      await ensureCollection(client, collection);
    }

    for (const page of cmsPages) {
      await ensureCmsPage(client, page);
    }

    for (const item of productCollectionLinks) {
      for (const collectionCode of item.collections) {
        await ensureProductCollection(client, item.sku, collectionCode);
      }
    }

    for (const widget of widgets) {
      await ensureWidget(client, widget);
    }

    await client.query('COMMIT');

    console.log('Bootstrap admin Paralel completado.');
    console.log(`Atributos base: ${attributeDefinitions.length}`);
    console.log(`Colecciones base: ${collections.length}`);
    console.log(`Paginas CMS base: ${cmsPages.length}`);
    console.log(`Widgets base: ${widgets.length}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Fallo bootstrap-paralel-admin:', error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
