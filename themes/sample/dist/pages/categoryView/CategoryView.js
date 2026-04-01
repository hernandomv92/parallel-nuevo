import { CategoryProvider } from '@components/frontStore/catalog/CategoryContext.js';
import { CategoryProductsPagination } from '@components/frontStore/catalog/CategoryProductsPagination.js';
import { DefaultProductFilterRender } from '@components/frontStore/catalog/DefaultProductFilterRender.js';
import { ProductFilter } from '@components/frontStore/catalog/ProductFilter.js';
import { ProductList } from '@components/frontStore/catalog/ProductList.js';
import { ProductSorting } from '@components/frontStore/catalog/ProductSorting.js';
import React from 'react';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';
function getAttributeValue(product, pattern) {
    var _a;
    return (_a = (product.attributes || []).find((attribute) => pattern.test(attribute.attributeCode || ''))) === null || _a === void 0 ? void 0 : _a.optionText;
}
function stripHtml(value) {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
function getPlainText(value) {
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
        const candidate = value;
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
function getActiveCatalogFilters(filters = []) {
    return filters.filter((filter) => !['page', 'limit', 'sort'].includes(filter.key));
}
function formatFilterValue(value) {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
    }
    if (Array.isArray(value)) {
        return value.map((item) => formatFilterValue(item)).filter(Boolean).join(', ');
    }
    if (value && typeof value === 'object') {
        const candidate = value;
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
    var _a, _b, _c, _d, _e, _f;
    const colorAttribute = getAttributeValue(product, /color|colour/i);
    const sportAttribute = getAttributeValue(product, /sport|deporte/i);
    const brandAttribute = getAttributeValue(product, /brand|marca/i);
    const colors = (((_a = product.variantGroup) === null || _a === void 0 ? void 0 : _a.variantAttributes) || [])
        .filter((attribute) => /color|colour/i.test(attribute.attributeCode || ''))
        .flatMap((attribute) => attribute.options || [])
        .filter((option, index, array) => array.findIndex((item) => item.optionText === option.optionText) === index);
    return (React.createElement("a", { href: product.url, className: "group block" },
        React.createElement("div", { className: "aspect-[0.84] overflow-hidden rounded-[24px] bg-neutral-100" }, product.image ? (React.createElement("img", { src: product.image.url, alt: product.image.alt || product.name, className: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" })) : (React.createElement("div", { className: "flex h-full items-center justify-center text-sm font-semibold text-neutral-400" }, "Sin imagen"))),
        React.createElement("div", { className: "space-y-2 px-1 pb-2 pt-4" },
            React.createElement("div", { className: "flex items-start justify-between gap-4" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.22em] text-[#de4d2e]" }, ((_b = product.inventory) === null || _b === void 0 ? void 0 : _b.isInStock) ? 'Disponible' : 'Agotado'),
                    React.createElement("h3", { className: "mt-1 text-lg font-semibold tracking-tight text-neutral-950" }, product.name),
                    React.createElement("p", { className: "text-sm text-neutral-500" }, brandAttribute || sportAttribute || colorAttribute || 'Producto destacado')),
                React.createElement("div", { className: "text-right text-lg font-semibold tracking-tight text-neutral-950" }, ((_d = (_c = product.price) === null || _c === void 0 ? void 0 : _c.special) === null || _d === void 0 ? void 0 : _d.text) || ((_f = (_e = product.price) === null || _e === void 0 ? void 0 : _e.regular) === null || _f === void 0 ? void 0 : _f.text))),
            colors.length > 0 && (React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("div", { className: "flex items-center gap-1.5" }, colors.slice(0, 5).map((option) => (React.createElement("span", { key: option.optionId, className: "h-3.5 w-3.5 rounded-full border border-neutral-300 bg-white", title: option.optionText })))),
                React.createElement("span", { className: "text-sm text-neutral-500" },
                    colors.length,
                    " colores"))))));
}
export default function CategoryView({ category }) {
    var _a;
    const activeFilters = getActiveCatalogFilters(category.products.currentFilters);
    const categoryDescription = getCategoryDescription(category);
    const categoryWhatsAppLink = buildWhatsAppHref(`Hola, quiero asesoria sobre la categoria ${category.name} en Parallel Store.`);
    return (React.createElement(CategoryProvider, { category: category },
        React.createElement("div", { className: "mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-12" },
            React.createElement("section", { className: "mb-8 overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-950 text-white" },
                React.createElement("div", { className: "grid gap-0 lg:grid-cols-[1.15fr_0.85fr]" },
                    React.createElement("div", { className: "px-6 py-8 md:px-10 md:py-10" },
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-white/55" }, "Coleccion"),
                        React.createElement("h1", { className: "mt-4 text-4xl font-black tracking-tight md:text-6xl" }, category.name),
                        React.createElement("p", { className: "mt-4 max-w-[58ch] text-sm leading-7 text-white/72 md:text-base" }, categoryDescription),
                        React.createElement("div", { className: "mt-8 grid gap-4 sm:grid-cols-3" },
                            React.createElement("div", { className: "rounded-[20px] border border-white/10 bg-white/5 px-4 py-4" },
                                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.24em] text-white/55" }, "Productos"),
                                React.createElement("p", { className: "mt-2 text-2xl font-black tracking-tight" }, category.products.total)),
                            React.createElement("div", { className: "rounded-[20px] border border-white/10 bg-white/5 px-4 py-4" },
                                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.24em] text-white/55" }, "Subcategorias"),
                                React.createElement("p", { className: "mt-2 text-2xl font-black tracking-tight" }, category.children.length)),
                            React.createElement("div", { className: "rounded-[20px] border border-white/10 bg-white/5 px-4 py-4" },
                                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.24em] text-white/55" }, "Filtros activos"),
                                React.createElement("p", { className: "mt-2 text-2xl font-black tracking-tight" }, activeFilters.length)))),
                    React.createElement("div", { className: "relative min-h-[260px] bg-neutral-100 lg:min-h-full" },
                        ((_a = category.image) === null || _a === void 0 ? void 0 : _a.url) ? (React.createElement(React.Fragment, null,
                            React.createElement("img", { src: category.image.url, alt: category.image.alt || category.name, className: "absolute inset-0 h-full w-full object-cover" }),
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" }))) : (React.createElement("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#f5f5f5,_#d4d4d4_38%,_#171717_100%)]" })),
                        React.createElement("div", { className: "relative flex h-full items-end p-6 md:p-8" },
                            React.createElement("div", { className: "max-w-[26ch] rounded-[22px] border border-white/10 bg-black/35 px-5 py-5 backdrop-blur" },
                                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.24em] text-white/60" }, "Destacado"),
                                React.createElement("p", { className: "mt-3 text-base font-semibold leading-7 text-white/88" }, "Explora referencias destacadas y encuentra opciones por marca, deporte o estilo.")))))),
            category.children.length > 0 && (React.createElement("section", { className: "mb-8" },
                React.createElement("div", { className: "flex flex-col gap-4 rounded-[28px] border border-neutral-200 bg-white px-5 py-5 md:px-6" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-neutral-500" }, "Subcategorias"),
                        React.createElement("h2", { className: "mt-2 text-2xl font-black tracking-tight text-neutral-950" }, "Explora opciones mas especificas")),
                    React.createElement("div", { className: "flex flex-wrap gap-3" }, category.children.map((child) => (React.createElement("a", { key: child.uuid || child.categoryId, href: child.url || `/${child.uuid}`, className: "rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-neutral-900 transition hover:border-neutral-950 hover:bg-white" }, child.name))))))),
            React.createElement("div", { className: "mb-8 flex flex-col gap-4 border-b border-neutral-200 pb-8 md:flex-row md:items-end md:justify-between" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-neutral-500" }, "Seleccion disponible"),
                    React.createElement("h2", { className: "mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl" }, "Productos disponibles"),
                    activeFilters.length > 0 && (React.createElement("div", { className: "mt-4 flex flex-wrap gap-2" }, activeFilters.map((filter) => (React.createElement("span", { key: `${filter.key}-${formatFilterValue(filter.value)}`, className: "rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-600" },
                        filter.key,
                        ": ",
                        formatFilterValue(filter.value))))))),
                React.createElement("div", { className: "flex flex-col gap-4 text-sm text-neutral-950 md:items-end" },
                    React.createElement("span", { className: "font-semibold" },
                        category.products.total,
                        " productos"),
                    React.createElement("a", { href: categoryWhatsAppLink, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center rounded-full border border-neutral-950 px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white" }, "Consultar categoria"),
                    React.createElement(ProductSorting, { className: "min-w-[220px] justify-end", renderSortSelect: ({ options, value, onChange }) => (React.createElement("label", { className: "flex items-center gap-3 text-sm font-medium" },
                            React.createElement("span", { className: "whitespace-nowrap" }, "Ordenar por"),
                            React.createElement("select", { className: "rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-neutral-950", value: value, onChange: (event) => onChange(event.target.value) }, options.map((option) => (React.createElement("option", { key: option.code, value: option.code }, option.label || option.name)))))) }))),
            React.createElement("div", { className: "grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]" },
                React.createElement("aside", { className: "lg:sticky lg:top-28 lg:h-fit" },
                    React.createElement("div", { className: "rounded-[28px] border border-neutral-200 bg-white p-6" },
                        React.createElement(ProductFilter, { currentFilters: category.products.currentFilters, availableAttributes: category.availableAttributes, categories: category.children, priceRange: category.priceRange }, (renderProps) => (React.createElement(DefaultProductFilterRender, { renderProps: renderProps, title: "Filtros", showFilterSummary: true })))),
                    React.createElement("div", { className: "mt-5 rounded-[28px] bg-neutral-950 p-6 text-white" },
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-white/60" }, "Ayuda de compra"),
                        React.createElement("h3", { className: "mt-3 text-2xl font-black tracking-tight" }, "Resuelve dudas antes de comprar"),
                        React.createElement("p", { className: "mt-3 text-sm leading-7 text-white/72" }, "Si quieres confirmar disponibilidad, talla o tiempos de entrega, escr\u00EDbenos y te ayudamos a elegir mejor."),
                        React.createElement("div", { className: "mt-5 space-y-2 text-sm text-white/75" },
                            React.createElement("p", null, contactConfig.whatsappDisplay),
                            React.createElement("p", null, contactConfig.serviceHours)),
                        React.createElement("a", { href: categoryWhatsAppLink, target: "_blank", rel: "noreferrer", className: "mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-black transition hover:bg-neutral-200" }, "Pedir asesoria"))),
                React.createElement("div", null,
                    React.createElement(ProductList, { products: category.products.items, layout: "grid", gridColumns: 3, className: "gap-x-6 gap-y-10", emptyMessage: "No hay productos disponibles en esta categoria por ahora. Ajusta los filtros o explora otras secciones.", renderItem: ProductCard }),
                    React.createElement("div", { className: "mt-12" },
                        React.createElement(CategoryProductsPagination, null)))))));
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
//# sourceMappingURL=CategoryView.js.map