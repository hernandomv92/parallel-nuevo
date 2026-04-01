import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';

export default function OperationsGuide() {
  return (
    <GuidePanel
      title="Cuando usar colecciones"
      intro="Las colecciones son para campanas, marcas destacadas, drops o narrativas editoriales. No reemplazan categorias ni atributos."
      items={[
        {
          title: 'Base actual',
          description: 'Paralel ya parte con colecciones base: Nike, Jordan, Running, Nuevos ingresos y Street rotation.'
        },
        {
          title: 'Drops y curaduria',
          description: 'Usa colecciones para agrupar lanzamientos, best sellers, nuevas entradas o selecciones premium sin tocar la estructura raiz.'
        },
        {
          title: 'Home y widgets',
          description: 'La home y los futuros widgets deben leer estas colecciones para reducir hardcodeo cuando cambie una campana.'
        },
        {
          title: 'Temporalidad',
          description: 'Piensa las colecciones como capas flexibles. Deben poder activarse, ocultarse o rehacerse sin danar el catalogo principal.'
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
