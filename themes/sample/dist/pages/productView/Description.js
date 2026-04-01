import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
export default function Description() {
    const { description, attributes = [] } = useProduct();
    const detailItems = attributes.filter((attribute) => /brand|marca|sport|deporte|material|gender|genero|collection|coleccion|color/i.test(attribute.attributeCode || ''));
    return (React.createElement("div", { className: "grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px]" },
        React.createElement("div", null,
            React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500" }, "Descripcion"),
            React.createElement("div", { className: "mt-5 space-y-4 text-sm leading-7 text-neutral-700", dangerouslySetInnerHTML: { __html: description } }),
            detailItems.length > 0 && (React.createElement("div", { className: "mt-10" },
                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500" }, "Ficha rapida"),
                React.createElement("div", { className: "mt-5 flex flex-wrap gap-3" }, detailItems.map((attribute) => (React.createElement("div", { key: `${attribute.attributeCode}-${attribute.optionText}`, className: "rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700" },
                    React.createElement("span", { className: "font-semibold text-neutral-950" },
                        attribute.attributeName,
                        ":"),
                    ' ',
                    attribute.optionText))))))),
        React.createElement("div", { className: "rounded-[28px] bg-neutral-100 p-8" },
            React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500" }, "Detalles de compra"),
            React.createElement("div", { className: "mt-6 space-y-5 text-sm leading-7 text-neutral-700" },
                React.createElement("div", null,
                    React.createElement("p", { className: "font-semibold text-neutral-950" }, "Autenticidad"),
                    React.createElement("p", null, "Referencias seleccionadas con informacion clara para comprar con confianza.")),
                React.createElement("div", null,
                    React.createElement("p", { className: "font-semibold text-neutral-950" }, "Envios"),
                    React.createElement("p", null, "Consulta cobertura, costos y tiempos de entrega antes de finalizar tu pedido.")),
                React.createElement("div", null,
                    React.createElement("p", { className: "font-semibold text-neutral-950" }, "Cambios"),
                    React.createElement("p", null, "Resuelve dudas de talla y conoce las condiciones de cambio antes de comprar."))))));
}
export const layout = {
    areaId: 'productPageBottom',
    sortOrder: 10
};
//# sourceMappingURL=Description.js.map