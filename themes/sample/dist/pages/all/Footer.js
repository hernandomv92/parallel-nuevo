import React from 'react';
import { buildWhatsAppHref, contactConfig } from '../../lib/contact.js';
export default function Footer() {
    return (React.createElement("div", { className: "bg-neutral-950 text-white" },
        React.createElement("div", { className: "mx-auto max-w-[1440px] px-4 py-16 md:px-8" },
            React.createElement("div", { className: "grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]" },
                React.createElement("div", { className: "space-y-5" },
                    React.createElement("p", { className: "text-[12px] font-semibold uppercase tracking-[0.28em] text-white/60" }, "Sneakers y estilo"),
                    React.createElement("h3", { className: "text-3xl font-black uppercase tracking-[0.18em]" }, "Parallel Store"),
                    React.createElement("p", { className: "max-w-md text-sm leading-7 text-white/65" }, "Encuentra referencias seleccionadas de Nike, Adidas, Jordan y otras marcas para comprar por categoria, deporte o estilo.")),
                React.createElement("div", null,
                    React.createElement("h4", { className: "mb-6 text-[12px] font-black uppercase tracking-[0.28em] text-white" }, "Catalogo"),
                    React.createElement("ul", { className: "space-y-3 text-sm text-white/70" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "/hombre", className: "transition hover:text-white" }, "Hombre")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/mujer", className: "transition hover:text-white" }, "Mujer")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/ninos", className: "transition hover:text-white" }, "Ninos")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/deportes", className: "transition hover:text-white" }, "Deportes")))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "mb-6 text-[12px] font-black uppercase tracking-[0.28em] text-white" }, "Navegacion"),
                    React.createElement("ul", { className: "space-y-3 text-sm text-white/70" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "/", className: "transition hover:text-white" }, "Inicio")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/deportes", className: "transition hover:text-white" }, "Comprar por deporte")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/contacto", className: "transition hover:text-white" }, "Contacto")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/account/login", className: "transition hover:text-white" }, "Mi cuenta")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/cart", className: "transition hover:text-white" }, "Carrito")))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "mb-6 text-[12px] font-black uppercase tracking-[0.28em] text-white" }, "Contacto"),
                    React.createElement("p", { className: "text-sm leading-6 text-white/70" }, "Si quieres confirmar talla, disponibilidad o tiempos de entrega, escribenos y te ayudamos a cerrar tu compra."),
                    React.createElement("div", { className: "mt-6 space-y-3 text-sm text-white/70" },
                        React.createElement("p", null, contactConfig.whatsappDisplay),
                        React.createElement("p", null, contactConfig.email),
                        React.createElement("p", null, contactConfig.serviceHours),
                        React.createElement("a", { href: buildWhatsAppHref('Hola, quiero hablar con el equipo comercial de Parallel Store.'), target: "_blank", rel: "noreferrer", className: "inline-flex rounded-full bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-black transition hover:bg-neutral-200" }, "Abrir WhatsApp"),
                        React.createElement("a", { href: "/contacto", className: "inline-flex rounded-full border border-white/20 px-5 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white hover:text-black" }, "Ver pagina de contacto")))))));
}
export const layout = {
    areaId: 'footerTop',
    sortOrder: 1
};
//# sourceMappingURL=Footer.js.map