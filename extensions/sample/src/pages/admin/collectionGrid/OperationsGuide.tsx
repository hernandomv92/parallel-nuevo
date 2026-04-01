import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Colecciones"
      intro="Las colecciones agrupan productos con una lógica editorial o comercial. Sirven para campañas, vitrinas de marca, lanzamientos y bloques de home sin alterar la estructura base del catálogo."
      items={[
        {
          title: 'Diferencia frente a categorías',
          description:
            'La categoría organiza navegación permanente. La colección agrupa temporal o editorialmente y puede cambiar sin romper la taxonomía principal.'
        },
        {
          title: 'Cómo se usan en el sitio',
          description:
            'Una colección puede alimentar widgets, home, bloques de temporada o vitrinas por marca. Es la forma correcta de curar producto sin rehacer la tienda.'
        },
        {
          title: 'Cuándo crear una colección nueva',
          description:
            'Créala para campañas, drops, novedades, best sellers o selecciones de marca. Si la agrupación debe vivir siempre como entrada principal, probablemente era categoría.'
        },
        {
          title: 'Relación con productos',
          description:
            'Después de crear la colección, puedes asociarla desde la ficha del producto o desde la propia colección para construir vitrinas más flexibles.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 15
};
