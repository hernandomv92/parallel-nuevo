import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Cupones"
      intro="Desde aqui controlas las promociones activas o planeadas. Esta vista te permite revisar codigos, editar reglas y mantener claro que descuento esta disponible para el cliente."
      items={[
        {
          title: 'Cuando usar cupones',
          description:
            'Usalos para campañas medibles, recuperacion comercial, descuentos por monto o beneficios para grupos concretos. No reemplazan el precio base del catalogo.'
        },
        {
          title: 'Lectura operativa',
          description:
            'Revisa que cada cupon tenga una descripcion interna clara, fechas coherentes y una regla facil de entender por el equipo.'
        },
        {
          title: 'Impacto en checkout',
          description:
            'El cupon solo genera efecto si cumple sus condiciones. Un descuento mal configurado puede no aplicar o aplicar de mas, por eso conviene probarlo.'
        },
        {
          title: 'Buena practica',
          description:
            'Mantiene nombres de campaña ordenados y desactiva cupones viejos para que el panel siga siendo legible para el negocio.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 15
};
