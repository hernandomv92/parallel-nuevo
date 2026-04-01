import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Paginas CMS"
      intro="Usa paginas CMS para textos estaticos y soporte. En esta fase ya existe una base repetible para que negocio no arranque desde cero cada vez."
      items={[
        {
          title: 'Paginas prioritarias',
          description: 'La base recomendada es: Envios, Cambios y devoluciones, Guia de tallas, FAQ, Terminos y Privacidad.'
        },
        {
          title: 'Consistencia',
          description: 'Manten un tono claro, directo y operativo. Estas paginas ayudan a reducir dudas y abandono en el checkout.'
        },
        {
          title: 'Ruta especial',
          description: 'La pagina de Contacto vive hoy como ruta custom /contacto en la extension. El resto del soporte si debe ir por CMS.'
        },
        {
          title: 'Como se conecta con la tienda',
          description:
            'Estas paginas alimentan footer, soporte y confianza comercial. Si falta una politica clave, el cliente lo nota antes de comprar.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
