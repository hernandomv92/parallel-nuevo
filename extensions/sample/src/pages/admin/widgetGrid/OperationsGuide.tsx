import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Widgets y home"
      intro="Usa widgets para editar contenido comercial sin tocar código. Esta sección sirve para mover narrativa, banners y colecciones destacadas manteniendo intacta la estructura visual del storefront."
      items={[
        {
          title: 'Areas activas',
          description: 'homepageFeaturedCollections, homepageEditorialLead y homepageOperationalBanner ya tienen seed inicial y se ven en la home.'
        },
        {
          title: 'Flujo recomendado',
          description:
            'Empieza por editar textos, banners y colecciones de los widgets activos. La idea es que negocio pueda ajustar la home sin depender del equipo técnico.'
        },
        {
          title: 'Cómo se refleja en el sitio',
          description:
            'Lo que cambies aquí impacta la home y otras áreas editables. Si necesitas una estructura nueva, eso ya pasa a una tarea de theme o extension.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
