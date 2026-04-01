import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Atributos operativos recomendados"
      intro="Los atributos sostienen filtros, variantes y consistencia futura. En Paralel ya existe un set base para que la operacion no invente nombres distintos en cada carga."
      items={[
        {
          title: 'Base minima',
          description: 'Marca, genero, deporte, color, talla, material y estado comercial son la base actual del proyecto.'
        },
        {
          title: 'Variantes',
          description: 'Color y talla deben quedar listos para variantes reales. Marca y deporte normalmente son filtros, no variantes.'
        },
        {
          title: 'Naming',
          description: 'Usa nombres simples y estables. Evita duplicados como Color/Colores o Marca/Brand. El admin debe hablar un solo idioma operativo.'
        },
        {
          title: 'Opciones sugeridas',
          description: 'Ya existe una base de opciones para Marca, Genero, Deporte, Color, Talla, Material y Estado comercial. Extiendela con criterio antes de duplicar.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
