import React from 'react';
import GuidePanel from '../../../components/admin/GuidePanel.js';
export default function SeoGuide() {
    return (React.createElement(GuidePanel, { title: "C\u00F3mo completar SEO en este producto", intro: "Esta secci\u00F3n no es t\u00E9cnica: define c\u00F3mo se ve la ficha en la URL y c\u00F3mo se presenta en buscadores. Si queda vac\u00EDa o confusa, el producto pierde claridad comercial.", compact: true, items: [
            {
                title: 'URL Key',
                description: 'Usa un slug simple y legible, normalmente basado en nombre y color principal. Evita fechas, códigos internos o palabras repetidas.'
            },
            {
                title: 'Meta Title',
                description: 'Resume la referencia tal como alguien la buscaría: marca, modelo y rasgo principal. Debe servir para Google y también para identificar rápido el producto.'
            },
            {
                title: 'Meta Description',
                description: 'Escribe una descripción corta con beneficio o contexto comercial. No copies toda la ficha: basta con una promesa clara y natural.'
            }
        ] }));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 55
};
//# sourceMappingURL=SeoGuide.js.map