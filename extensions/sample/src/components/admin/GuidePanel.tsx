import React from 'react';

type GuideItem = {
  title: string;
  description: string;
};

type GuidePanelProps = {
  title: string;
  intro: string;
  items?: GuideItem[];
  compact?: boolean;
};

export default function GuidePanel({
  title,
  intro,
  items = [],
  compact = false
}: GuidePanelProps) {
  return (
    <div className="mb-6 rounded-lg border border-[#d9e2f2] bg-[#f8fbff]">
      <div className="border-b border-[#d9e2f2] px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5272a3]">
          Guia operativa
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#0f172a]">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#41556f]">{intro}</p>
      </div>
      <div className={`grid gap-3 px-5 py-4 ${compact ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
        {items.map((item) => (
          <div key={item.title} className="rounded-md border border-[#d9e2f2] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[#0f172a]">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#41556f]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
