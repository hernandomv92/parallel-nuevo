import React from 'react';

export default function TopBar() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] md:flex-row md:items-center md:justify-between md:px-8">
        <p>Envios a toda Colombia</p>
        <div className="flex flex-wrap items-center gap-4 text-white/70">
          <span>Nuevos lanzamientos</span>
          <span>Marcas destacadas</span>
          <a href="/deportes" className="transition hover:text-white">
            Comprar ahora
          </a>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'headerTop',
  sortOrder: 1
};
