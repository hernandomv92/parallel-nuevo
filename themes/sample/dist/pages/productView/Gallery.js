import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
export default function Gallery() {
    const { image, gallery, name } = useProduct();
    const images = [image, ...(gallery || [])].filter((item) => item && item.url);
    const [activeIndex, setActiveIndex] = React.useState(0);
    React.useEffect(() => {
        setActiveIndex(0);
    }, [image === null || image === void 0 ? void 0 : image.url]);
    const activeImage = images[activeIndex] || image;
    return (React.createElement("div", { className: "space-y-4" },
        React.createElement("div", { className: "flex items-center justify-between gap-4" },
            React.createElement("div", null,
                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500" }, "Galeria de producto"),
                React.createElement("h2", { className: "mt-2 text-2xl font-black tracking-tight text-neutral-950" }, "Vista detallada")),
            React.createElement("div", { className: "rounded-full bg-neutral-100 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-600" },
                images.length,
                " imagenes")),
        React.createElement("div", { className: "grid gap-4 lg:grid-cols-[88px_minmax(0,1fr)]" },
            React.createElement("div", { className: "order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col" }, images.map((item, index) => {
                const isActive = index === activeIndex;
                return (React.createElement("button", { key: `${item.url}-${index}`, type: "button", onClick: () => setActiveIndex(index), className: `overflow-hidden rounded-2xl border bg-neutral-100 transition ${isActive ? 'border-neutral-950' : 'border-neutral-200 hover:border-neutral-400'}` },
                    React.createElement("img", { src: item.url, alt: item.alt || name, className: "h-20 w-20 object-cover" })));
            })),
            React.createElement("div", { className: "order-1 overflow-hidden rounded-[32px] bg-neutral-100 lg:order-2" }, activeImage ? (React.createElement("img", { src: activeImage.url, alt: activeImage.alt || name, className: "h-full min-h-[520px] w-full object-cover" })) : (React.createElement("div", { className: "flex min-h-[520px] items-center justify-center text-sm font-semibold text-neutral-400" }, "Sin imagen"))))));
}
export const layout = {
    areaId: 'productPageMiddleLeft',
    sortOrder: 10
};
//# sourceMappingURL=Gallery.js.map