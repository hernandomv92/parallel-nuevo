import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Reglas para categorias"
      intro="Las categorias son la fuente de verdad para URLs y navegacion principal. No mezcles categorias con atributos si no necesitas SEO o una landing real."
      items={[
        {
          title: 'Raices principales',
          description: 'Mantiene Hombre, Mujer, Ninos y Deportes como puntos de entrada. Desde ahi se puede profundizar por marca o subcategoria.'
        },
        {
          title: 'Subcategorias utiles',
          description: 'Crea subcategorias solo cuando el cliente realmente las va a navegar: running, futbol, basketball, apparel, accesorios.'
        },
        {
          title: 'Descripcion y SEO',
          description: 'Cada categoria importante debe tener descripcion clara y slug limpio. Esa pagina sera indexable y debe sentirse editorial.'
        },
        {
          title: 'No duplicar funciones',
          description: 'Si algo vive mejor como filtro de marca o deporte, dejalo como atributo. No conviertas cada filtro en categoria.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
