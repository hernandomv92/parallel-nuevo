import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';
export default function OperationsGuide() {
    return (React.createElement(GuidePanel, { title: "Categor\u00EDas", intro: "Las categor\u00EDas ordenan la navegaci\u00F3n del cat\u00E1logo y construyen URLs reales del sitio. Si una categor\u00EDa existe aqu\u00ED, luego puede usarse al crear o editar productos.", items: [
            {
                title: 'Para qué sirve esta sección',
                description: 'Aquí defines la estructura visible del catálogo: entradas principales, subcategorías y páginas navegables que el cliente puede recorrer.'
            },
            {
                title: 'Cómo impacta en productos',
                description: 'Cuando creas una categoría, esa opción queda disponible para asignarla a productos. Esa asociación define contexto, breadcrumbs y parte del SEO de la tienda.'
            },
            {
                title: 'Cuándo crear una categoría nueva',
                description: 'Créala cuando vaya a existir una landing navegable o una URL con sentido comercial. Si solo necesitas filtrar por marca, color o deporte, usa atributos.'
            },
            {
                title: 'Buenas prácticas',
                description: 'Mantén pocos niveles, nombres claros y slugs limpios. La categoría debe ayudar a entender el catálogo, no duplicar filtros.'
            }
        ] }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 15
};
//# sourceMappingURL=OperationsGuide.js.map