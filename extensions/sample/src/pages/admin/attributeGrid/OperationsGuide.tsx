import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Atributos"
      intro="Los atributos describen el producto y sostienen filtros, variantes y consistencia del catálogo. Esta sección define el idioma operativo que luego aparece al crear productos."
      items={[
        {
          title: 'Para qué sirve esta sección',
          description:
            'Aquí creas campos como marca, deporte, color, talla o material. Luego esos atributos se usan dentro de la ficha del producto.'
        },
        {
          title: 'Impacto en el sitio',
          description:
            'Un atributo bien configurado puede alimentar filtros y mejorar la lectura del producto. Si se duplica o se nombra mal, el catálogo pierde orden.'
        },
        {
          title: 'Atributo vs categoría',
          description:
            'Usa atributo cuando necesites clasificar o filtrar. Usa categoría cuando necesites una página navegable con URL propia.'
        },
        {
          title: 'Consistencia',
          description:
            'Mantén un solo nombre por concepto: por ejemplo Marca, no Brand. Esa consistencia evita que el equipo cargue datos incompatibles.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 15
};
