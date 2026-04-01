import React, { useMemo } from 'react';

interface BoldResultPageProps {
  order: {
    orderNumber: string;
    grandTotal: {
      text: string;
    };
    paymentStatus: {
      code: string;
      name: string;
    };
  };
}

function useBoldStatus() {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    const params = new URLSearchParams(window.location.search);
    return params.get('bold-tx-status') || '';
  }, []);
}

export default function BoldResultPage({ order }: BoldResultPageProps) {
  const txStatus = useBoldStatus();

  const copy = useMemo(() => {
    switch (txStatus) {
      case 'approved':
        return {
          title: 'Bold reportó un pago aprobado',
          text: 'El comprador sí terminó el flujo en Bold. Aun así, esta tienda debe confirmar el estado definitivo consultando la transacción o escuchando el webhook antes de marcar la orden como pagada.'
        };
      case 'rejected':
        return {
          title: 'Bold reportó un pago rechazado',
          text: 'La orden sigue en estado pendiente dentro de la tienda. Puedes dejar que el cliente intente nuevamente o cerrar manualmente la venta si corresponde.'
        };
      case 'pending':
        return {
          title: 'El pago quedó pendiente de confirmación',
          text: 'Esto puede pasar cuando Bold o la entidad financiera aún no entregan el estado final. La recomendación es consultar la transacción antes de tomar una decisión operativa.'
        };
      default:
        return {
          title: 'Volviste desde Bold',
          text: 'Esta pantalla ya está lista para recibir la respuesta de Bold. El siguiente paso técnico es conectar la consulta de transacción y el webhook para sincronizar el estado real del pago.'
        };
    }
  }, [txStatus]);

  return (
    <div className="page-width py-10">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.06)] md:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
          Respuesta de Bold
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
          {copy.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-neutral-600">{copy.text}</p>

        <div className="mt-8 grid gap-4 rounded-[24px] bg-neutral-50 p-5 md:grid-cols-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-neutral-500">
              Orden
            </p>
            <p className="mt-2 text-xl font-black text-neutral-950">
              #{order.orderNumber}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-neutral-500">
              Total
            </p>
            <p className="mt-2 text-xl font-black text-neutral-950">
              {order.grandTotal.text}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-neutral-500">
              Estado en EverShop
            </p>
            <p className="mt-2 text-xl font-black text-neutral-950">
              {order.paymentStatus.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    order(uuid: getContextValue("boldOrderId")) {
      orderNumber
      grandTotal {
        text
      }
      paymentStatus {
        code
        name
      }
    }
  }
`;
