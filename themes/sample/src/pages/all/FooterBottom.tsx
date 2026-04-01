import React from 'react';

export default function FooterBottom() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-white/10 px-4 py-8 text-[11px] uppercase tracking-[0.22em] text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p>2026 Parallel Store. Sneakers, apparel y referencias destacadas.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="/" className="transition hover:text-white">Inicio</a>
          <a href="/deportes" className="transition hover:text-white">Catalogo</a>
          <a href="/account/login" className="transition hover:text-white">Cuenta</a>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'footerBottom',
  sortOrder: 1
};
