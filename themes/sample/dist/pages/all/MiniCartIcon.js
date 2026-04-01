import React from 'react';
export default function MiniCartIcon() {
    return (React.createElement("a", { href: "/cart", className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-100", "aria-label": "Carrito" },
        React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M6 6h15l-1.5 8h-11z" }),
            React.createElement("path", { d: "M6 6 4 3H1" }),
            React.createElement("circle", { cx: "9", cy: "20", r: "1.25" }),
            React.createElement("circle", { cx: "18", cy: "20", r: "1.25" }))));
}
export const layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 20
};
//# sourceMappingURL=MiniCartIcon.js.map