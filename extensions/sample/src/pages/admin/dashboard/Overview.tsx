import React from 'react';

export default function Overview() {
  const cards = [
    {
      title: 'Catálogo',
      description:
        'Crea productos, categorías, atributos y colecciones con una estructura que luego se refleja en navegación, filtros y vitrinas.'
    },
    {
      title: 'Contenido',
      description:
        'Usa Páginas y Widgets para editar mensajes comerciales, banners y apoyo informativo sin tocar el theme.'
    },
    {
      title: 'Promociones',
      description:
        'Configura cupones con reglas claras para descuentos generales, productos específicos o dinámicas de compra.'
    }
  ];

  return (
    <section className="mb-6 rounded-lg border border-[#d9e2f2] bg-gradient-to-r from-[#0f172a] via-[#1232d3] to-[#1d4ed8] text-white shadow-sm">
      <div className="px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
          Panel comercial
        </p>
        <h2 className="mt-2 text-2xl font-bold">Admin de Paralel Store</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85">
          Este panel está preparado para mostrar cómo una tienda puede operar catálogo, contenido y
          promociones desde una base clara. Cada sección explica qué hace, cuándo usarla y cómo se
          refleja en el sitio.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-md bg-white/10 px-4 py-4">
              <p className="text-sm font-semibold">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/80">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 8
};
