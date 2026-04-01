import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Cómo configurar un cupón"
      intro="Un cupón define una regla promocional que luego se aplica en carrito o checkout. Antes de guardarlo, debe quedar claro a quién aplica, qué descuento ofrece y bajo qué condiciones se activa."
      compact
      items={[
        {
          title: 'Código y descripción',
          description:
            'El código es lo que el cliente escribe. La descripción es interna y debe ayudarte a entender rápido el objetivo de la promo.'
        },
        {
          title: 'Tipo de descuento',
          description:
            'Puedes descontar un valor fijo, un porcentaje, aplicarlo a toda la orden, a productos concretos o crear dinámicas tipo compra X y lleva Y.'
        },
        {
          title: 'Condiciones',
          description:
            'Las condiciones permiten exigir monto mínimo, cantidad mínima, productos específicos o segmentos de clientes. Si no las usas, el cupón queda más abierto.'
        },
        {
          title: 'Cómo se refleja en la tienda',
          description:
            'Cuando el cupón está activo y cumple condiciones, el descuento aparece en carrito y checkout. Si la promo es puntual, define fechas y desactívalo al terminar.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'couponEditGeneral',
  sortOrder: 5
};
