import React from 'react';
export default function GuidePanel({ title, intro, items = [], compact = false }) {
    return (React.createElement("div", { className: "mb-6 rounded-lg border border-[#d9e2f2] bg-[#f8fbff]" },
        React.createElement("div", { className: "border-b border-[#d9e2f2] px-5 py-4" },
            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-[#5272a3]" }, "Guia operativa"),
            React.createElement("h2", { className: "mt-2 text-lg font-semibold text-[#0f172a]" }, title),
            React.createElement("p", { className: "mt-2 max-w-3xl text-sm leading-6 text-[#41556f]" }, intro)),
        React.createElement("div", { className: `grid gap-3 px-5 py-4 ${compact ? 'md:grid-cols-1' : 'md:grid-cols-2'}` }, items.map((item) => (React.createElement("div", { key: item.title, className: "rounded-md border border-[#d9e2f2] bg-white px-4 py-4" },
            React.createElement("p", { className: "text-sm font-semibold text-[#0f172a]" }, item.title),
            React.createElement("p", { className: "mt-2 text-sm leading-6 text-[#41556f]" }, item.description)))))));
}
//# sourceMappingURL=GuidePanel.js.map