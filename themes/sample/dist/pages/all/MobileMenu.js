import React from 'react';
const links = [
    { href: '/hombre', label: 'Hombre' },
    { href: '/mujer', label: 'Mujer' },
    { href: '/ninos', label: 'Ninos' },
    { href: '/deportes', label: 'Deportes' },
    { href: '/contacto', label: 'Contacto' }
];
export default function MobileMenu() {
    return (React.createElement("nav", { className: "overflow-x-auto border-t border-neutral-200 lg:hidden" },
        React.createElement("div", { className: "mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-3 md:px-8" }, links.map((link) => (React.createElement("a", { key: link.href, href: link.href, className: "whitespace-nowrap rounded-full border border-neutral-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-100" }, link.label))))));
}
export const layout = {
    areaId: 'headerBottom',
    sortOrder: 1
};
//# sourceMappingURL=MobileMenu.js.map