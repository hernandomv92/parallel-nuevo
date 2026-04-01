import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Productos"
      intro="Esta tabla es el centro operativo del catálogo. Desde aquí revisas qué referencias están activas, con stock, precio e imagen, y decides qué producto editar o crear."
      items={[
        {
          title: 'Qué debería verse aquí',
          description:
            'Cada fila representa una referencia lista para venderse o exhibirse. Si falta imagen, precio, stock o estado, conviene corregir la ficha antes de publicar.'
        },
        {
          title: 'Relación con categorías',
          description:
            'Un producto bien asignado a categoría luego aparece en la navegación correcta. Si una categoría no existe o no está bien definida, primero ajústala en Categorías.'
        },
        {
          title: 'Relación con atributos y colecciones',
          description:
            'Marca, deporte, color y talla viven como atributos. Las colecciones sirven para vitrinas y bloques editoriales, no para reemplazar la categoría principal.'
        },
        {
          title: 'Uso recomendado',
          description:
            'Usa esta vista para control rápido y entra a editar cuando necesites cambiar contenido, media, SEO, inventario o asociaciones del producto.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 15
};
