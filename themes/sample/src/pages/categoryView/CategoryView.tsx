import { CategoryProvider } from '@components/frontStore/catalog/CategoryContext.js';
import { CategoryProductsPagination } from '@components/frontStore/catalog/CategoryProductsPagination.js';
import { DefaultProductFilterRender } from '@components/frontStore/catalog/DefaultProductFilterRender.js';
import { ProductFilter } from '@components/frontStore/catalog/ProductFilter.js';
import { ProductList } from '@components/frontStore/catalog/ProductList.js';
import { ProductSorting } from '@components/frontStore/catalog/ProductSorting.js';
import React from 'react';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';

type CatalogFilter = {
  key: string;
  operation?: string;
  value: unknown;
};

function getAttributeValue(product, pattern) {
  return (product.attributes || []).find((attribute) =>
    pattern.test(attribute.attributeCode || '')
  )?.optionText;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getPlainText(value: unknown): string {
  if (typeof value === 'string') {
    return stripHtml(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => getPlainText(item))
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  if (value && typeof value === 'object') {
    const candidate = value as Record<string, unknown>;

    if (typeof candidate.html === 'string') {
      return stripHtml(candidate.html);
    }

    if (typeof candidate.text === 'string') {
      return stripHtml(candidate.text);
    }

    if (candidate.data) {
      return getPlainText(candidate.data);
    }

    if (candidate.blocks) {
      return getPlainText(candidate.blocks);
    }

    if (candidate.columns) {
      return getPlainText(candidate.columns);
    }
  }

  return '';
}

function getCategoryDescription(category) {
  const fallback = 'Explora el catalogo por categoria, marca, color, talla y deporte.';
  const description = getPlainText(category.description);
  return description || fallback;
}

function getActiveCatalogFilters(filters: CatalogFilter[] = []) {
  return filters.filter((filter) => !['page', 'limit', 'sort'].includes(filter.key));
}

function formatFilterValue(value: unknown) {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatFilterValue(item)).filter(Boolean).join(', ');
  }

  if (value && typeof value === 'object') {
    const candidate = value as Record<string, unknown>;
    if (candidate.label) {
      return formatFilterValue(candidate.label);
    }
    if (candidate.name) {
      return formatFilterValue(candidate.name);
    }
    if (candidate.value) {
      return formatFilterValue(candidate.value);
    }
    return getPlainText(candidate);
  }

  return '';
}

function ProductCard(product) {
  const colorAttribute = getAttributeValue(product, /color|colour/i);
  const sportAttribute = getAttributeValue(product, /sport|deporte/i);
  const brandAttribute = getAttributeValue(product, /brand|marca/i);
  const colors = (product.variantGroup?.variantAttributes || [])
    .filter((attribute) => /color|colour/i.test(attribute.attributeCode || ''))
    .flatMap((attribute) => attribute.options || [])
    .filter((option, index, array) => array.findIndex((item) => item.optionText === option.optionText) === index);

  return (
    <a href={product.url} className="group block">
      <div className="aspect-[0.84] overflow-hidden rounded-[24px] bg-neutral-100">
        {product.image ? (
          <img
            src={product.image.url}
            alt={product.image.alt || product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-neutral-400">
            Sin imagen
          </div>
        )}
      </div>
      <div className="space-y-2 px-1 pb-2 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#de4d2e]">
              {product.inventory?.isInStock ? 'Disponible' : 'Agotado'}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
              {product.name}
            </h3>
            <p className="text-sm text-neutral-500">
              {brandAttribute || sportAttribute || colorAttribute || 'Producto destacado'}
            </p>
          </div>
          <div className="text-right text-lg font-semibold tracking-tight text-neutral-950">
            {product.price?.special?.text || product.price?.regular?.text}
          </div>
        </div>

        {colors.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {colors.slice(0, 5).map((option) => (
                <span
                  key={option.optionId}
                  className="h-3.5 w-3.5 rounded-full border border-neutral-300 bg-white"
                  title={option.optionText}
                />
              ))}
            </div>
            <span className="text-sm text-neutral-500">
              {colors.length} colores
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function CategoryView({ category }) {
  const activeFilters = getActiveCatalogFilters(category.products.currentFilters);
  const categoryDescription = getCategoryDescription(category);
  const categoryWhatsAppLink = buildWhatsAppHref(
    `Hola, quiero asesoria sobre la categoria ${category.name} en Parallel Store.`
  );

  return (
    <CategoryProvider category={category}>
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-12">
        <section className="mb-8 overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-950 text-white">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="px-6 py-8 md:px-10 md:py-10">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/55">
                Coleccion
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-[58ch] text-sm leading-7 text-white/72 md:text-base">
                {categoryDescription}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Productos</p>
                  <p className="mt-2 text-2xl font-black tracking-tight">{category.products.total}</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Subcategorias</p>
                  <p className="mt-2 text-2xl font-black tracking-tight">{category.children.length}</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Filtros activos</p>
                  <p className="mt-2 text-2xl font-black tracking-tight">{activeFilters.length}</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[260px] bg-neutral-100 lg:min-h-full">
              {category.image?.url ? (
                <>
                  <img
                    src={category.image.url}
                    alt={category.image.alt || category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#f5f5f5,_#d4d4d4_38%,_#171717_100%)]" />
              )}

              <div className="relative flex h-full items-end p-6 md:p-8">
                <div className="max-w-[26ch] rounded-[22px] border border-white/10 bg-black/35 px-5 py-5 backdrop-blur">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/60">Destacado</p>
                  <p className="mt-3 text-base font-semibold leading-7 text-white/88">
                    Explora referencias destacadas y encuentra opciones por marca, deporte o estilo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {category.children.length > 0 && (
          <section className="mb-8">
            <div className="flex flex-col gap-4 rounded-[28px] border border-neutral-200 bg-white px-5 py-5 md:px-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-neutral-500">
                  Subcategorias
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950">
                  Explora opciones mas especificas
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.children.map((child) => (
                  <a
                    key={child.uuid || child.categoryId}
                    href={child.url || `/${child.uuid}`}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-neutral-900 transition hover:border-neutral-950 hover:bg-white"
                  >
                    {child.name}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-neutral-500">
              Seleccion disponible
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
              Productos disponibles
            </h2>
            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={`${filter.key}-${formatFilterValue(filter.value)}`}
                    className="rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-600"
                  >
                    {filter.key}: {formatFilterValue(filter.value)}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 text-sm text-neutral-950 md:items-end">
            <span className="font-semibold">{category.products.total} productos</span>
            <a
              href={categoryWhatsAppLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-neutral-950 px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            >
              Consultar categoria
            </a>
            <ProductSorting
              className="min-w-[220px] justify-end"
              renderSortSelect={({ options, value, onChange }) => (
                <label className="flex items-center gap-3 text-sm font-medium">
                  <span className="whitespace-nowrap">Ordenar por</span>
                  <select
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-neutral-950"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                  >
                    {options.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.label || option.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[28px] border border-neutral-200 bg-white p-6">
              <ProductFilter
                currentFilters={category.products.currentFilters}
                availableAttributes={category.availableAttributes}
                categories={category.children}
                priceRange={category.priceRange}
              >
                {(renderProps) => (
                  <DefaultProductFilterRender
                    renderProps={renderProps}
                    title="Filtros"
                    showFilterSummary
                  />
                )}
              </ProductFilter>
            </div>

            <div className="mt-5 rounded-[28px] bg-neutral-950 p-6 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/60">
                Ayuda de compra
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">
                Resuelve dudas antes de comprar
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Si quieres confirmar disponibilidad, talla o tiempos de entrega, escríbenos y te
                ayudamos a elegir mejor.
              </p>
              <div className="mt-5 space-y-2 text-sm text-white/75">
                <p>{contactConfig.whatsappDisplay}</p>
                <p>{contactConfig.serviceHours}</p>
              </div>
              <a
                href={categoryWhatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-black transition hover:bg-neutral-200"
              >
                Pedir asesoria
              </a>
            </div>
          </aside>

          <div>
            <ProductList
              products={category.products.items}
              layout="grid"
              gridColumns={3}
              className="gap-x-6 gap-y-10"
              emptyMessage="No hay productos disponibles en esta categoria por ahora. Ajusta los filtros o explora otras secciones."
              renderItem={ProductCard}
            />
            <div className="mt-12">
              <CategoryProductsPagination />
            </div>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    category: currentCategory {
      showProducts
      name
      uuid
      description
      image {
        alt
        url
      }
      products {
        items {
          ...Product
        }
        currentFilters {
          key
          operation
          value
        }
        total
      }
      availableAttributes {
        attributeCode
        attributeName
        options {
          optionId
          optionText
        }
      }
      priceRange {
        min
        max
        minText
        maxText
      }
      children {
        categoryId
        name
        uuid
        url
      }
    }
  }
`;

export const fragments = `
  fragment Product on Product {
    productId
    name
    sku
    url
    price {
      regular {
        value
        text
      }
      special {
        value
        text
      }
    }
    inventory {
      isInStock
    }
    image {
      alt
      url
    }
    attributes: attributeIndex {
      attributeCode
      optionText
    }
    variantGroup {
      variantAttributes {
        attributeCode
        attributeName
        options {
          optionId
          optionText
          productId
        }
      }
    }
  }
`;
