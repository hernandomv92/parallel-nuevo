import React from 'react';

interface SearchBoxProps {
  searchPageUrl: string;
}

export default function SearchBox({ searchPageUrl }: SearchBoxProps) {
  return (
    <form
      action={searchPageUrl}
      method="get"
      role="search"
      className="hidden h-11 min-w-[220px] items-center gap-3 rounded-full border border-neutral-200 bg-neutral-100 px-4 text-sm text-neutral-500 transition hover:border-neutral-950 hover:bg-white focus-within:border-neutral-950 focus-within:bg-white focus-within:text-neutral-900 md:inline-flex"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        name="keyword"
        placeholder="Buscar por deporte o marca"
        aria-label="Buscar productos en la tienda"
        className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-700 transition hover:text-neutral-950"
      >
        Buscar
      </button>
    </form>
  );
}

export const layout = {
  areaId: 'headerMiddleRight',
  sortOrder: 5
};

export const query = `
  query Query {
    searchPageUrl: url(routeId: "catalogSearch")
  }
`;
