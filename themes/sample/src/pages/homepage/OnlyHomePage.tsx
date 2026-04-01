import React from 'react';
import { Area } from '@evershop/evershop/components/common';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';

const heroSlides = [
  {
    eyebrow: 'Coleccion destacada',
    title: 'Nike y Adidas en una sola vitrina',
    description:
      'Descubre sneakers y apparel de marcas reconocidas en una tienda pensada para comprar facil, rapido y con estilo.',
    image: '/brand-assets/nike-banner.jpeg',
    primaryLink: '/hombre',
    primaryLabel: 'Comprar hombre',
    secondaryLink: buildWhatsAppHref(
      'Hola, quiero recibir asesoria para encontrar tenis disponibles en Parallel Store.'
    ),
    secondaryLabel: 'Hablar por WhatsApp'
  },
  {
    eyebrow: 'Nuevos favoritos',
    title: 'Drops, running y street rotation',
    description:
      'Encuentra referencias para running, streetwear y rotacion diaria con una seleccion clara por categoria y marca.',
    image: '/brand-assets/adidas-banner.jpeg',
    primaryLink: '/mujer',
    primaryLabel: 'Ver mujer',
    secondaryLink: buildWhatsAppHref(
      'Hola, quiero consultar drops, running y referencias activas de Parallel Store.'
    ),
    secondaryLabel: 'Consultar por WhatsApp'
  }
];

const categoryCards = [
  {
    title: 'Hombre',
    subtitle: 'Sneakers, running, futbol y essentials',
    href: '/hombre',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Mujer',
    subtitle: 'Performance, estilo y lanzamientos',
    href: '/mujer',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Ninos',
    subtitle: 'Tallas, color y colecciones activas',
    href: '/ninos',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200'
  }
];

const brandCards = [
  {
    title: 'Nike',
    text: 'Running, lifestyle, basketball y training.',
    href: '/deportes',
    logoSrc: '/brand-assets/nike-logo.svg'
  },
  {
    title: 'Adidas',
    text: 'Originals, performance y futbol.',
    href: '/mujer',
    logoSrc: '/brand-assets/adidas-logo.svg'
  },
  {
    title: 'Jordan',
    text: 'Drops, retros y siluetas iconicas.',
    href: '/hombre',
    logoSrc: '/brand-assets/jordan-logo.svg'
  },
  {
    title: 'On',
    text: 'Running premium, tecnologia y rotacion de marca.',
    href: '/deportes',
    logoSrc: '/brand-assets/on-logo.svg'
  }
];

const editorialBlocks = [
  {
    title: 'Compra por deporte',
    text: 'Explora running, futbol, basketball, training y lifestyle para encontrar tu proxima referencia mas rapido.',
    href: '/deportes'
  },
  {
    title: 'Encuentra tu talla ideal',
    text: 'Resuelve dudas de disponibilidad, tallas y compra directa con nuestro equipo por WhatsApp.',
    href: '/contacto'
  }
];

const featuredBrands = [
  { name: 'Nike', logoSrc: '/brand-assets/nike-logo.svg', href: '/deportes' },
  { name: 'Adidas', logoSrc: '/brand-assets/adidas-logo.svg', href: '/mujer' },
  { name: 'Jordan', logoSrc: '/brand-assets/jordan-logo.svg', href: '/hombre' },
  { name: 'On', logoSrc: '/brand-assets/on-logo.svg', href: '/deportes' }
];

const servicePillars = [
  {
    eyebrow: 'Servicio',
    title: 'Envios monitoreados',
    text: 'Visibilidad total sobre estados, precio y promesas de entrega.'
  },
  {
    eyebrow: 'Seleccion',
    title: 'Marcas reconocidas',
    text: 'Nike, Adidas, Jordan, On y otras referencias para todos los estilos.'
  },
  {
    eyebrow: 'Compra',
    title: 'Asesoria directa',
    text: 'Te ayudamos a elegir talla, referencia y disponibilidad por WhatsApp.'
  },
  {
    eyebrow: 'Contacto',
    title: 'Atencion rapida',
    text: 'Respuesta en horario comercial para resolver tu compra sin vueltas.'
  }
];

export default function OnlyHomePage() {
  return (
    <div className="bg-white text-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-100">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-6 px-4 py-4 text-center text-[11px] font-bold uppercase tracking-[0.26em] text-neutral-700 md:px-8">
          <span>Nuevos ingresos</span>
          <span className="hidden md:inline">Marcas destacadas</span>
          <span className="hidden md:inline">Compra por categoria</span>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-5 md:px-8">
        {heroSlides.map((slide, index) => (
          <article
            key={slide.title}
            className={`relative overflow-hidden rounded-[28px] bg-neutral-950 ${
              index === 0 ? 'min-h-[70vh]' : 'min-h-[56vh]'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent" />
            <div className="relative z-10 flex min-h-[inherit] max-w-[760px] flex-col justify-end px-6 py-10 text-white md:px-12 md:py-14">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-white/70">
                {slide.eyebrow}
              </p>
              <h1 className="max-w-[12ch] text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-[56ch] text-base leading-7 text-white/80 md:text-lg">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={slide.primaryLink}
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[12px] font-black uppercase tracking-[0.24em] text-black transition hover:bg-neutral-200"
                >
                  {slide.primaryLabel}
                </a>
                <a
                  href={slide.secondaryLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3 text-[12px] font-black uppercase tracking-[0.24em] text-white backdrop-blur transition hover:bg-white hover:text-black"
                >
                  {slide.secondaryLabel}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-4 md:px-8">
        <div className="rounded-[28px] border border-neutral-200 bg-[#1232d3] px-6 py-6 text-white md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-white/65">
                Compra asistida
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl">
                Compra con ayuda cuando la necesites
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-7 text-white/82">
                Si quieres confirmar disponibilidad, talla o tiempos de entrega, puedes escribirnos
                y recibir respuesta directa de nuestro equipo.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:min-w-[320px]">
              <a
                href={buildWhatsAppHref(
                  'Hola, quiero asesoria para comprar tenis en Parallel Store.'
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[12px] font-black uppercase tracking-[0.24em] text-black transition hover:bg-neutral-200"
              >
                Escribir a WhatsApp
              </a>
              <div className="rounded-[20px] border border-white/15 bg-white/10 px-5 py-4 text-sm leading-6 text-white/82">
                <p className="font-semibold text-white">{contactConfig.whatsappDisplay}</p>
                <p>{contactConfig.serviceHours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8">
        <div className="rounded-[24px] border border-neutral-200 bg-white px-5 py-5 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
                Conoce la gran variedad de marcas que tenemos para ti
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-neutral-950 md:text-3xl">
                Marcas destacadas
              </h2>
            </div>
            <a
              href="/deportes"
              className="text-[12px] font-black uppercase tracking-[0.24em] text-neutral-500 transition hover:text-neutral-900"
            >
              Ver referencias
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                className="flex min-h-[112px] items-center justify-center rounded-[20px] border border-neutral-200 bg-neutral-50 px-6 py-6 transition hover:-translate-y-1 hover:border-neutral-950 hover:bg-white"
              >
                <img
                  src={brand.logoSrc}
                  alt={brand.name}
                  className="max-h-12 w-auto max-w-[150px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
              Explora la tienda
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
              Compra por genero
            </h2>
          </div>
          <a
            href="/deportes"
            className="text-[12px] font-black uppercase tracking-[0.24em] text-neutral-500 transition hover:text-neutral-900"
          >
            Ver todo
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categoryCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative min-h-[430px] overflow-hidden rounded-[24px] bg-neutral-100"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="relative flex h-full items-end p-8 text-white">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">{card.title}</h3>
                  <p className="mt-2 max-w-[24ch] text-sm uppercase tracking-[0.18em] text-white/72">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[28px] bg-neutral-950 px-8 py-10 text-white md:px-10">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/55">
              Marcas
            </p>
            <h2 className="mt-4 max-w-[10ch] text-4xl font-black uppercase leading-[0.96] tracking-tight md:text-5xl">
              Tus favoritas en un solo lugar
            </h2>
            <p className="mt-5 max-w-[58ch] text-sm leading-7 text-white/72">
              Descubre una seleccion de marcas con referencias para lifestyle, running,
              basketball y entrenamiento.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {brandCards.map((brand) => (
              <a
                key={brand.title}
                href={brand.href}
                className="rounded-[24px] border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-neutral-950"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
                  Marca
                </p>
                <div className="mt-4 flex min-h-[48px] items-center">
                  <img
                    src={brand.logoSrc}
                    alt={brand.title}
                    className="max-h-10 w-auto max-w-[132px] object-contain"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-black tracking-tight">{brand.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{brand.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
              Seleccion destacada
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
              Productos para ti
            </h2>
          </div>
          <a
            href="/deportes"
            className="text-[12px] font-black uppercase tracking-[0.24em] text-neutral-500 transition hover:text-neutral-900"
          >
            Ver mas
          </a>
        </div>

        <div className="rounded-[28px] border border-neutral-200 bg-white px-5 py-7 md:px-8">
          <Area id="homepageFeaturedCollections" className="space-y-12" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
              Inspiracion
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
              Compra con mas claridad
            </h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          {editorialBlocks.map((block, index) => (
            <a
              key={block.title}
              href={block.href}
              className={`rounded-[28px] px-8 py-9 transition hover:-translate-y-1 ${
                index === 0 ? 'bg-neutral-100 text-neutral-950' : 'bg-neutral-950 text-white'
              }`}
            >
              <p
                className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                  index === 0 ? 'text-neutral-500' : 'text-white/55'
                }`}
              >
                Destacado
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase tracking-tight">
                {block.title}
              </h3>
              <p
                className={`mt-4 max-w-[56ch] text-sm leading-7 ${
                  index === 0 ? 'text-neutral-600' : 'text-white/72'
                }`}
              >
                {block.text}
              </p>
            </a>
          ))}
          <Area id="homepageEditorialLead" className="space-y-6" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8">
        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white">
          <Area id="homepageOperationalBanner" />
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {servicePillars.map((pillar) => (
            <div key={pillar.title}>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
                {pillar.eyebrow}
              </p>
              <h4 className="mt-3 text-lg font-black uppercase tracking-tight">{pillar.title}</h4>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
