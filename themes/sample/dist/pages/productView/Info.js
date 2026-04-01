import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
import { buildWhatsAppHref } from '../../lib/contact.js';
const brandLogoMap = {
    nike: '/brand-assets/nike-logo.svg',
    adidas: '/brand-assets/adidas-logo.svg',
    jordan: '/brand-assets/jordan-logo.svg',
    on: '/brand-assets/on-logo.svg'
};
export default function Info() {
    var _a, _b, _c, _d, _e;
    const { name, price, sku, inventory, attributes = [] } = useProduct();
    const subtitle = (_a = attributes.find((attribute) => /sport|deporte|category/i.test(attribute.attributeCode || ''))) === null || _a === void 0 ? void 0 : _a.optionText;
    const brand = (_b = attributes.find((attribute) => /brand|marca/i.test(attribute.attributeCode || ''))) === null || _b === void 0 ? void 0 : _b.optionText;
    const gender = (_c = attributes.find((attribute) => /gender|genero/i.test(attribute.attributeCode || ''))) === null || _c === void 0 ? void 0 : _c.optionText;
    const collection = (_d = attributes.find((attribute) => /collection|coleccion/i.test(attribute.attributeCode || ''))) === null || _d === void 0 ? void 0 : _d.optionText;
    const brandLogo = brand ? brandLogoMap[brand.toLowerCase()] : null;
    const contextChips = [brand, subtitle, gender, collection].filter(Boolean);
    const quickConsultLink = buildWhatsAppHref(`Hola, quiero una asesoria rapida sobre ${name}${sku ? ` (${sku})` : ''}.`);
    return (React.createElement("div", { className: "space-y-6" },
        React.createElement("div", { className: "space-y-3" },
            React.createElement("div", { className: "flex flex-wrap items-center gap-3" },
                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500" }, "Parallel Store"),
                React.createElement("span", { className: `rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ${(inventory === null || inventory === void 0 ? void 0 : inventory.isInStock) ? 'bg-[#e7f6ed] text-[#17663a]' : 'bg-neutral-200 text-neutral-600'}` }, (inventory === null || inventory === void 0 ? void 0 : inventory.isInStock) ? 'Disponible' : 'Agotado')),
            brandLogo && (React.createElement("div", { className: "flex h-8 items-center" },
                React.createElement("img", { src: brandLogo, alt: brand || 'Marca', className: "max-h-8 w-auto max-w-[120px] object-contain" }))),
            React.createElement("h1", { className: "text-4xl font-black tracking-tight text-neutral-950 md:text-5xl" }, name),
            React.createElement("p", { className: "text-base text-neutral-500" },
                subtitle || 'Referencia destacada',
                " ",
                sku ? `· SKU ${sku}` : '')),
        contextChips.length > 0 && (React.createElement("div", { className: "flex flex-wrap gap-2" }, contextChips.map((chip) => (React.createElement("span", { key: chip, className: "rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-600" }, chip))))),
        React.createElement("div", { className: "rounded-[28px] border border-neutral-200 bg-white p-6" },
            React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500" }, "Precio"),
            React.createElement("div", { className: "mt-4 flex items-center gap-4" },
                React.createElement("span", { className: "text-3xl font-semibold tracking-tight text-neutral-950" }, ((_e = price.special) === null || _e === void 0 ? void 0 : _e.text) || price.regular.text),
                price.special && (React.createElement("span", { className: "text-lg text-neutral-400 line-through" }, price.regular.text)))),
        React.createElement("p", { className: "max-w-[48ch] text-sm leading-7 text-neutral-600" }, "Selecciona color y talla antes de agregar al carrito y confirma cualquier duda antes de finalizar tu compra."),
        React.createElement("a", { href: quickConsultLink, target: "_blank", rel: "noreferrer", className: "inline-flex items-center rounded-full bg-neutral-100 px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-950 hover:text-white" }, "Resolver dudas por WhatsApp")));
}
export const layout = {
    areaId: 'productPageMiddleRight',
    sortOrder: 10
};
//# sourceMappingURL=Info.js.map