import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
import { buildWhatsAppHref } from '../../lib/contact.js';

const brandLogoMap = {
  nike: '/brand-assets/nike-logo.svg',
  adidas: '/brand-assets/adidas-logo.svg',
  jordan: '/brand-assets/jordan-logo.svg',
  on: '/brand-assets/on-logo.svg'
};

export default function Info() {
  const { name, price, sku, inventory, attributes = [] } = useProduct();
  const subtitle = attributes.find((attribute) =>
    /sport|deporte|category/i.test(attribute.attributeCode || '')
  )?.optionText;
  const brand = attributes.find((attribute) =>
    /brand|marca/i.test(attribute.attributeCode || '')
  )?.optionText;
  const gender = attributes.find((attribute) =>
    /gender|genero/i.test(attribute.attributeCode || '')
  )?.optionText;
  const collection = attributes.find((attribute) =>
    /collection|coleccion/i.test(attribute.attributeCode || '')
  )?.optionText;
  const brandLogo = brand ? brandLogoMap[brand.toLowerCase()] : null;
  const contextChips = [brand, subtitle, gender, collection].filter(Boolean);
  const quickConsultLink = buildWhatsAppHref(
    `Hola, quiero una asesoria rapida sobre ${name}${sku ? ` (${sku})` : ''}.`
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500">
            Parallel Store
          </p>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ${
              inventory?.isInStock ? 'bg-[#e7f6ed] text-[#17663a]' : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            {inventory?.isInStock ? 'Disponible' : 'Agotado'}
          </span>
        </div>

        {brandLogo && (
          <div className="flex h-8 items-center">
            <img
              src={brandLogo}
              alt={brand || 'Marca'}
              className="max-h-8 w-auto max-w-[120px] object-contain"
            />
          </div>
        )}

        <h1 className="text-4xl font-black tracking-tight text-neutral-950 md:text-5xl">
          {name}
        </h1>
        <p className="text-base text-neutral-500">
          {subtitle || 'Referencia destacada'} {sku ? `· SKU ${sku}` : ''}
        </p>
      </div>

      {contextChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {contextChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-600"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      <div className="rounded-[28px] border border-neutral-200 bg-white p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
          Precio
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-3xl font-semibold tracking-tight text-neutral-950">
            {price.special?.text || price.regular.text}
          </span>
          {price.special && (
            <span className="text-lg text-neutral-400 line-through">{price.regular.text}</span>
          )}
        </div>
      </div>

      <p className="max-w-[48ch] text-sm leading-7 text-neutral-600">
        Selecciona color y talla antes de agregar al carrito y confirma cualquier duda antes de
        finalizar tu compra.
      </p>

      <a
        href={quickConsultLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full bg-neutral-100 px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-950 hover:text-white"
      >
        Resolver dudas por WhatsApp
      </a>
    </div>
  );
}

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 10
};
