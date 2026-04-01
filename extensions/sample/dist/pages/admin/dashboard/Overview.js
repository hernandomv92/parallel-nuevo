import React from 'react';
export default function Overview() {
    const cards = [
        {
            title: 'Catálogo',
            description: 'Crea productos, categorías, atributos y colecciones con una estructura que luego se refleja en navegación, filtros y vitrinas.'
        },
        {
            title: 'Contenido',
            description: 'Usa Páginas y Widgets para editar mensajes comerciales, banners y apoyo informativo sin tocar el theme.'
        },
        {
            title: 'Promociones',
            description: 'Configura cupones con reglas claras para descuentos generales, productos específicos o dinámicas de compra.'
        }
    ];
    return (React.createElement("section", { className: "mb-6 rounded-lg border border-[#d9e2f2] bg-gradient-to-r from-[#0f172a] via-[#1232d3] to-[#1d4ed8] text-white shadow-sm" },
        React.createElement("div", { className: "px-6 py-5" },
            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-white/70" }, "Panel comercial"),
            React.createElement("h2", { className: "mt-2 text-2xl font-bold" }, "Admin de Paralel Store"),
            React.createElement("p", { className: "mt-3 max-w-3xl text-sm leading-6 text-white/85" }, "Este panel est\u00E1 preparado para mostrar c\u00F3mo una tienda puede operar cat\u00E1logo, contenido y promociones desde una base clara. Cada secci\u00F3n explica qu\u00E9 hace, cu\u00E1ndo usarla y c\u00F3mo se refleja en el sitio."),
            React.createElement("div", { className: "mt-5 grid gap-3 md:grid-cols-3" }, cards.map((card) => (React.createElement("article", { key: card.title, className: "rounded-md bg-white/10 px-4 py-4" },
                React.createElement("p", { className: "text-sm font-semibold" }, card.title),
                React.createElement("p", { className: "mt-2 text-sm leading-6 text-white/80" }, card.description))))))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 8
};
//# sourceMappingURL=Overview.js.map