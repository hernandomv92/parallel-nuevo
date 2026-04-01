import React from 'react';

const links = [
  { href: '/hombre', label: 'Hombre' },
  { href: '/mujer', label: 'Mujer' },
  { href: '/ninos', label: 'Ninos' },
  { href: '/deportes', label: 'Deportes' },
  { href: '/contacto', label: 'Contacto' }
];

export default function Menu() {
  return (
    <nav className="hidden items-center justify-center gap-8 lg:flex">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-[15px] font-semibold tracking-tight text-neutral-900 transition hover:text-neutral-500"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export const layout = {
  areaId: 'headerMiddleCenter',
  sortOrder: 1
};
