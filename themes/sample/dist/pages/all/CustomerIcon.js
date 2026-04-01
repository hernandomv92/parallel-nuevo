import React from 'react';
export default function CustomerIcon() {
    return (React.createElement("a", { href: "/account/login", className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-100", "aria-label": "Mi cuenta" },
        React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M20 21a8 8 0 1 0-16 0" }),
            React.createElement("circle", { cx: "12", cy: "7", r: "4" }))));
}
export const layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 10
};
//# sourceMappingURL=CustomerIcon.js.map