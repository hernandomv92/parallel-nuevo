import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';
export default function VariantGuide() {
    return (React.createElement(GuidePanel, { title: "C\u00F3mo crear variantes por talla", intro: "Si quieres que la talla aparezca como selector en el storefront, no basta con elegirla como atributo del producto. Debe existir un grupo de variantes real con una opci\u00F3n por talla.", compact: true, items: [
            {
                title: '1. Crea el grupo de variantes',
                description: 'En el bloque inferior de Variant Group crea un grupo nuevo para este producto. Ese paso convierte la referencia en base para variantes reales.'
            },
            {
                title: '2. Usa Talla como variante',
                description: 'Selecciona Talla como atributo de variante. Si también cambia el color entre referencias, puedes combinar Color y Talla dentro del mismo grupo.'
            },
            {
                title: '3. Crea un producto por talla',
                description: 'Cada talla debe existir como variante hija con su propio SKU, stock y estado. Si una talla no existe como variante, no aparecerá para elegirla en la PDP.'
            },
            {
                title: '4. Qué sí y qué no',
                description: 'Talla en Attributes solo describe o filtra. Talla en Variant Group habilita el selector del storefront. Esa es la diferencia clave.'
            }
        ] }));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 68
};
//# sourceMappingURL=VariantGuide.js.map