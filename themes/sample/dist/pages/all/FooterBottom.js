import React from 'react';
export default function FooterBottom() {
    return (React.createElement("div", { className: "bg-neutral-950 text-white" },
        React.createElement("div", { className: "mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-white/10 px-4 py-8 text-[11px] uppercase tracking-[0.22em] text-white/45 md:flex-row md:items-center md:justify-between md:px-8" },
            React.createElement("div", null,
                React.createElement("p", null, "2026 Parallel Store. Sneakers, apparel y referencias destacadas.")),
            React.createElement("div", { className: "flex flex-wrap items-center gap-4" },
                React.createElement("a", { href: "/", className: "transition hover:text-white" }, "Inicio"),
                React.createElement("a", { href: "/deportes", className: "transition hover:text-white" }, "Catalogo"),
                React.createElement("a", { href: "/account/login", className: "transition hover:text-white" }, "Cuenta")))));
}
export const layout = {
    areaId: 'footerBottom',
    sortOrder: 1
};
//# sourceMappingURL=FooterBottom.js.map