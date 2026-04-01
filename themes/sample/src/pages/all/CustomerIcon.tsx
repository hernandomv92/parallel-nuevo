import React from 'react';

export default function CustomerIcon() {
  return (
    <a
      href="/account/login"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-100"
      aria-label="Mi cuenta"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </a>
  );
}

export const layout = {
  areaId: 'headerMiddleRight',
  sortOrder: 10
};
