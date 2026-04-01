import React from 'react';

export default function Logo() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-3 text-neutral-950 no-underline transition hover:opacity-80"
      aria-label="Parallel Store"
    >
      <span className="text-[28px] font-black uppercase tracking-[0.28em] md:text-[34px]">
        Parallel
      </span>
    </a>
  );
}

export const layout = {
  areaId: 'headerMiddleLeft',
  sortOrder: 1
};
