import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';
export default function OperationsGuide() {
    return (React.createElement(GuidePanel, { title: "C\u00F3mo cargar un producto bien estructurado", intro: "Aqu\u00ED se crea la ficha principal del producto. Si se completa bien desde el inicio, luego la tienda puede navegarlo, filtrarlo, destacarlo en colecciones y comunicarlo mejor en buscadores.", items: [
            {
                title: 'Categoría principal',
                description: 'Asigna siempre una categoría raíz clara: Hombre, Mujer, Niños o Deportes. Esa categoría controla navegación, breadcrumbs y contexto en la PLP.'
            },
            {
                title: 'Marca y deporte',
                description: 'La marca no debe resolverse solo en el nombre. Usa atributos consistentes para marca y deporte para que el producto pueda filtrarse bien.'
            },
            {
                title: 'Color y talla',
                description: 'Usa variantes reales para color y talla cuando el producto lo necesite. Evita crear productos separados si solo cambia el color o la talla.'
            },
            {
                title: 'Colecciones editoriales',
                description: 'Si el producto va a home, narrativa de marca o bloques de temporada, asígnalo también a una colección como Nike, Jordan, Running o Nuevos ingresos.'
            },
            {
                title: 'Media y pricing',
                description: 'Sube imagen principal limpia, galería suficiente y precio final correcto para Colombia. Si hay comparativo, deja claro precio base y promocional.'
            },
            {
                title: 'SEO básico',
                description: 'Completa URL, meta title y meta description con lenguaje claro. Esa información ayuda a buscadores y también mejora el orden del catálogo.'
            }
        ] }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 1
};
//# sourceMappingURL=OperationsGuide.js.map