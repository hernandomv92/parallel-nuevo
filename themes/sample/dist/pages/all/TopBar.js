import React from 'react';
export default function TopBar() {
    return (React.createElement("div", { className: "bg-neutral-950 text-white" },
        React.createElement("div", { className: "mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] md:flex-row md:items-center md:justify-between md:px-8" },
            React.createElement("p", null, "Envios a toda Colombia"),
            React.createElement("div", { className: "flex flex-wrap items-center gap-4 text-white/70" },
                React.createElement("span", null, "Nuevos lanzamientos"),
                React.createElement("span", null, "Marcas destacadas"),
                React.createElement("a", { href: "/deportes", className: "transition hover:text-white" }, "Comprar ahora")))));
}
export const layout = {
    areaId: 'headerTop',
    sortOrder: 1
};
//# sourceMappingURL=TopBar.js.map