import { Form } from '@components/common/form/Form.js';
import { Button } from '@components/common/ui/Button.js';
import {
  AddToCart
} from '@components/frontStore/cart/AddToCart.js';
import {
  VariantSelector
} from '@components/frontStore/catalog/VariantSelector.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';

function VariantOption({ option, attribute, isSelected, onSelect }) {
  const isColor = /color|colour/i.test(attribute.attributeCode || '');

  if (isColor) {
    return (
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          if (option.available === false) {
            return;
          }
          await onSelect(attribute.attributeCode, option.optionId);
        }}
        className={`flex min-h-[56px] items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
          isSelected
            ? 'border-neutral-950 bg-neutral-950 text-white'
            : option.available === false
              ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300'
              : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-950'
        }`}
      >
        <span className="text-sm font-semibold">{option.optionText}</span>
        <span className="h-5 w-5 rounded-full border border-current/25 bg-white/80" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={async (event) => {
        event.preventDefault();
        if (option.available === false) {
          return;
        }
        await onSelect(attribute.attributeCode, option.optionId);
      }}
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
        isSelected
          ? 'border-neutral-950 bg-neutral-950 text-white'
          : option.available === false
            ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300'
            : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-950'
      }`}
    >
      {option.optionText}
    </button>
  );
}

function VariantAttribute({ attribute, options, onSelect, OptionItem }) {
  const isColor = /color|colour/i.test(attribute.attributeCode || '');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-neutral-950">
          {attribute.attributeName}
        </p>
        {attribute.selected && attribute.selectedOption && (
          <span className="text-sm text-neutral-500">
            {options.find((option) => option.optionId === attribute.selectedOption)?.optionText}
          </span>
        )}
      </div>

      <div className={isColor ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'grid grid-cols-2 gap-3'}>
        {options.map((option) => (
          <OptionItem
            key={option.optionId}
            option={option}
            attribute={attribute}
            isSelected={attribute.selected && attribute.selectedOption === option.optionId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductForm() {
  const { sku, name, inventory } = useProduct();
  const form = useForm();
  const whatsappLink = buildWhatsAppHref(
    `Hola, quiero confirmar disponibilidad, talla y precio del producto ${name}${sku ? ` (${sku})` : ''}.`
  );

  return (
    <Form id="productForm" method="POST" submitBtn={false} form={form}>
      <div className="space-y-8">
        <VariantSelector
          AttributeRenderer={VariantAttribute}
          OptionRenderer={VariantOption}
        />

        <div className="rounded-2xl bg-neutral-100 px-5 py-4 text-sm text-neutral-700">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-neutral-950">Ayuda para elegir</span>
          </div>
          <p className="mt-2 leading-6">
            Revisa talla, color y disponibilidad antes de agregar el producto al carrito.
          </p>
        </div>

        <AddToCart
          product={{ sku, isInStock: inventory.isInStock }}
          qty={1}
          onSuccess={() => toast.success('Producto agregado al carrito')}
          onError={(error) => toast.error(error || 'No fue posible agregar el producto')}
        >
          {(state: any, actions: any) => (
            <div className="space-y-4">
              <Button
                variant="default"
                size="lg"
                disabled={!state.canAddToCart || !state.isInStock}
                onClick={(event) => {
                  event.preventDefault();
                  actions.addToCart();
                }}
                className="h-14 w-full rounded-full bg-neutral-950 text-[12px] font-black uppercase tracking-[0.28em] text-white transition hover:bg-[#1232d3] disabled:cursor-not-allowed disabled:bg-neutral-300"
                isLoading={state.isLoading}
              >
                {state.isInStock ? 'Agregar al carrito' : 'Producto agotado'}
              </Button>

              <div className="rounded-2xl border border-neutral-200 px-5 py-4 text-sm leading-6 text-neutral-600">
                <p className="font-semibold text-neutral-950">Compra protegida</p>
                <p className="mt-1">
                  Compra con informacion clara sobre autenticidad, envios y cambios.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 w-full items-center justify-center rounded-full border border-[#1232d3] px-5 text-[12px] font-black uppercase tracking-[0.24em] text-[#1232d3] transition hover:bg-[#1232d3] hover:text-white"
              >
                Consultar por WhatsApp
              </a>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-100 px-4 py-4 text-sm leading-6 text-neutral-700">
                  <p className="font-semibold text-neutral-950">Talla y color</p>
                  <p className="mt-1">Elige tu variante antes de pasar al carrito.</p>
                </div>
                <div className="rounded-2xl bg-neutral-100 px-4 py-4 text-sm leading-6 text-neutral-700">
                  <p className="font-semibold text-neutral-950">Atencion directa</p>
                  <p className="mt-1">
                    {contactConfig.whatsappDisplay}. {contactConfig.serviceHours}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </AddToCart>
      </div>
    </Form>
  );
}

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 30
};
