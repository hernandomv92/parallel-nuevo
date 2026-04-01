import { Form } from '@components/common/form/Form.js';
import { Button } from '@components/common/ui/Button.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { VariantSelector } from '@components/frontStore/catalog/VariantSelector.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';
function VariantOption({ option, attribute, isSelected, onSelect }) {
    const isColor = /color|colour/i.test(attribute.attributeCode || '');
    if (isColor) {
        return (React.createElement("button", { type: "button", onClick: async (event) => {
                event.preventDefault();
                if (option.available === false) {
                    return;
                }
                await onSelect(attribute.attributeCode, option.optionId);
            }, className: `flex min-h-[56px] items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${isSelected
                ? 'border-neutral-950 bg-neutral-950 text-white'
                : option.available === false
                    ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-950'}` },
            React.createElement("span", { className: "text-sm font-semibold" }, option.optionText),
            React.createElement("span", { className: "h-5 w-5 rounded-full border border-current/25 bg-white/80" })));
    }
    return (React.createElement("button", { type: "button", onClick: async (event) => {
            event.preventDefault();
            if (option.available === false) {
                return;
            }
            await onSelect(attribute.attributeCode, option.optionId);
        }, className: `rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isSelected
            ? 'border-neutral-950 bg-neutral-950 text-white'
            : option.available === false
                ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300'
                : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-950'}` }, option.optionText));
}
function VariantAttribute({ attribute, options, onSelect, OptionItem }) {
    var _a;
    const isColor = /color|colour/i.test(attribute.attributeCode || '');
    return (React.createElement("div", { className: "space-y-3" },
        React.createElement("div", { className: "flex items-center justify-between gap-4" },
            React.createElement("p", { className: "text-sm font-semibold text-neutral-950" }, attribute.attributeName),
            attribute.selected && attribute.selectedOption && (React.createElement("span", { className: "text-sm text-neutral-500" }, (_a = options.find((option) => option.optionId === attribute.selectedOption)) === null || _a === void 0 ? void 0 : _a.optionText))),
        React.createElement("div", { className: isColor ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'grid grid-cols-2 gap-3' }, options.map((option) => (React.createElement(OptionItem, { key: option.optionId, option: option, attribute: attribute, isSelected: attribute.selected && attribute.selectedOption === option.optionId, onSelect: onSelect }))))));
}
export default function ProductForm() {
    const { sku, name, inventory } = useProduct();
    const form = useForm();
    const whatsappLink = buildWhatsAppHref(`Hola, quiero confirmar disponibilidad, talla y precio del producto ${name}${sku ? ` (${sku})` : ''}.`);
    return (React.createElement(Form, { id: "productForm", method: "POST", submitBtn: false, form: form },
        React.createElement("div", { className: "space-y-8" },
            React.createElement(VariantSelector, { AttributeRenderer: VariantAttribute, OptionRenderer: VariantOption }),
            React.createElement("div", { className: "rounded-2xl bg-neutral-100 px-5 py-4 text-sm text-neutral-700" },
                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                    React.createElement("span", { className: "font-medium text-neutral-950" }, "Ayuda para elegir")),
                React.createElement("p", { className: "mt-2 leading-6" }, "Revisa talla, color y disponibilidad antes de agregar el producto al carrito.")),
            React.createElement(AddToCart, { product: { sku, isInStock: inventory.isInStock }, qty: 1, onSuccess: () => toast.success('Producto agregado al carrito'), onError: (error) => toast.error(error || 'No fue posible agregar el producto') }, (state, actions) => (React.createElement("div", { className: "space-y-4" },
                React.createElement(Button, { variant: "default", size: "lg", disabled: !state.canAddToCart || !state.isInStock, onClick: (event) => {
                        event.preventDefault();
                        actions.addToCart();
                    }, className: "h-14 w-full rounded-full bg-neutral-950 text-[12px] font-black uppercase tracking-[0.28em] text-white transition hover:bg-[#1232d3] disabled:cursor-not-allowed disabled:bg-neutral-300", isLoading: state.isLoading }, state.isInStock ? 'Agregar al carrito' : 'Producto agotado'),
                React.createElement("div", { className: "rounded-2xl border border-neutral-200 px-5 py-4 text-sm leading-6 text-neutral-600" },
                    React.createElement("p", { className: "font-semibold text-neutral-950" }, "Compra protegida"),
                    React.createElement("p", { className: "mt-1" }, "Compra con informacion clara sobre autenticidad, envios y cambios.")),
                React.createElement("a", { href: whatsappLink, target: "_blank", rel: "noreferrer", className: "inline-flex h-14 w-full items-center justify-center rounded-full border border-[#1232d3] px-5 text-[12px] font-black uppercase tracking-[0.24em] text-[#1232d3] transition hover:bg-[#1232d3] hover:text-white" }, "Consultar por WhatsApp"),
                React.createElement("div", { className: "grid gap-3 sm:grid-cols-2" },
                    React.createElement("div", { className: "rounded-2xl bg-neutral-100 px-4 py-4 text-sm leading-6 text-neutral-700" },
                        React.createElement("p", { className: "font-semibold text-neutral-950" }, "Talla y color"),
                        React.createElement("p", { className: "mt-1" }, "Elige tu variante antes de pasar al carrito.")),
                    React.createElement("div", { className: "rounded-2xl bg-neutral-100 px-4 py-4 text-sm leading-6 text-neutral-700" },
                        React.createElement("p", { className: "font-semibold text-neutral-950" }, "Atencion directa"),
                        React.createElement("p", { className: "mt-1" },
                            contactConfig.whatsappDisplay,
                            ". ",
                            contactConfig.serviceHours,
                            ".")))))))));
}
export const layout = {
    areaId: 'productPageMiddleRight',
    sortOrder: 30
};
//# sourceMappingURL=Form.js.map