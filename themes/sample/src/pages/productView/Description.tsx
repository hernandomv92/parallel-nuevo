import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';

export default function Description() {
  const { description, attributes = [] } = useProduct();
  const detailItems = attributes.filter((attribute) =>
    /brand|marca|sport|deporte|material|gender|genero|collection|coleccion|color/i.test(
      attribute.attributeCode || ''
    )
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500">
          Descripcion
        </p>
        <div
          className="mt-5 space-y-4 text-sm leading-7 text-neutral-700"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {detailItems.length > 0 && (
          <div className="mt-10">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500">
              Ficha rapida
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {detailItems.map((attribute) => (
                <div
                  key={`${attribute.attributeCode}-${attribute.optionText}`}
                  className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700"
                >
                  <span className="font-semibold text-neutral-950">{attribute.attributeName}:</span>{' '}
                  {attribute.optionText}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-[28px] bg-neutral-100 p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500">
          Detalles de compra
        </p>
        <div className="mt-6 space-y-5 text-sm leading-7 text-neutral-700">
          <div>
            <p className="font-semibold text-neutral-950">Autenticidad</p>
            <p>Referencias seleccionadas con informacion clara para comprar con confianza.</p>
          </div>
          <div>
            <p className="font-semibold text-neutral-950">Envios</p>
            <p>Consulta cobertura, costos y tiempos de entrega antes de finalizar tu pedido.</p>
          </div>
          <div>
            <p className="font-semibold text-neutral-950">Cambios</p>
            <p>Resuelve dudas de talla y conoce las condiciones de cambio antes de comprar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'productPageBottom',
  sortOrder: 10
};
