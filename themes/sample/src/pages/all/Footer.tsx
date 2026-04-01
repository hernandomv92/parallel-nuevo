import React from 'react';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';

export default function Footer() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Sneakers y estilo
            </p>
            <h3 className="text-3xl font-black uppercase tracking-[0.18em]">Parallel Store</h3>
            <p className="max-w-md text-sm leading-7 text-white/65">
              Encuentra referencias seleccionadas de Nike, Adidas, Jordan y otras marcas para
              comprar por categoria, deporte o estilo.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-[12px] font-black uppercase tracking-[0.28em] text-white">
              Catalogo
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="/hombre" className="transition hover:text-white">Hombre</a></li>
              <li><a href="/mujer" className="transition hover:text-white">Mujer</a></li>
              <li><a href="/ninos" className="transition hover:text-white">Ninos</a></li>
              <li><a href="/deportes" className="transition hover:text-white">Deportes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[12px] font-black uppercase tracking-[0.28em] text-white">
              Navegacion
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="/" className="transition hover:text-white">Inicio</a></li>
              <li><a href="/deportes" className="transition hover:text-white">Comprar por deporte</a></li>
              <li><a href="/contacto" className="transition hover:text-white">Contacto</a></li>
              <li><a href="/account/login" className="transition hover:text-white">Mi cuenta</a></li>
              <li><a href="/cart" className="transition hover:text-white">Carrito</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[12px] font-black uppercase tracking-[0.28em] text-white">
              Contacto
            </h4>
            <p className="text-sm leading-6 text-white/70">
              Si quieres confirmar talla, disponibilidad o tiempos de entrega, escribenos y te
              ayudamos a cerrar tu compra.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p>{contactConfig.whatsappDisplay}</p>
              <p>{contactConfig.email}</p>
              <p>{contactConfig.serviceHours}</p>
              <a
                href={buildWhatsAppHref(
                  'Hola, quiero hablar con el equipo comercial de Parallel Store.'
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-black transition hover:bg-neutral-200"
              >
                Abrir WhatsApp
              </a>
              <a
                href="/contacto"
                className="inline-flex rounded-full border border-white/20 px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Ver pagina de contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'footerTop',
  sortOrder: 1
};
