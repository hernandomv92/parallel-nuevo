import React from 'react';
const contactConfig = {
    whatsappDisplay: '+57 323 825 3871',
    email: 'ventas@paralelstore.co',
    serviceHours: 'Lun a Sab - 9:00 AM a 7:00 PM',
    city: 'Colombia'
};
const whatsappPhone = contactConfig.whatsappDisplay.replace(/\D/g, '');
function buildWhatsAppHref(message) {
    const normalizedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappPhone}?text=${normalizedMessage}`;
}
const supportTopics = [
    {
        title: 'Disponibilidad real',
        text: 'Confirma stock, color, talla y si una referencia sigue activa antes de tomar una decision.'
    },
    {
        title: 'Ayuda para elegir',
        text: 'Usa el canal de contacto para resolver dudas de horma, uso, combinacion de outfits o rotacion de marca.'
    },
    {
        title: 'Pedido guiado',
        text: 'La conversacion sirve para cerrar el pedido con menos friccion y mas contexto comercial.'
    }
];
const contactChecklist = [
    'Referencia o link del producto que te interesa',
    'Talla que buscas o rango que normalmente usas',
    'Ciudad de entrega o cobertura que quieres confirmar',
    'Si tu prioridad es lifestyle, running, training o futbol'
];
const faqCards = [
    {
        title: 'Cuando escribirnos',
        text: 'Cuando quieras confirmar disponibilidad, revisar una talla puntual, validar tiempos o pedir una recomendacion antes de comprar.'
    },
    {
        title: 'Como respondemos',
        text: 'Respondemos dentro del horario publicado y usamos la conversacion para orientar, no para dejar al cliente solo con la ficha.'
    },
    {
        title: 'Que esperar',
        text: 'La pagina no promete automatizaciones vacias. El objetivo es que el cliente encuentre el canal correcto y reciba una respuesta clara.'
    }
];
export default function ContactPage() {
    return (React.createElement("div", { className: "bg-white text-neutral-950" },
        React.createElement("section", { className: "border-b border-neutral-200 bg-neutral-100" },
            React.createElement("div", { className: "mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20" },
                React.createElement("div", { className: "grid gap-10 lg:grid-cols-[1.15fr_0.85fr]" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.32em] text-neutral-500" }, "Contacto"),
                        React.createElement("h1", { className: "mt-4 max-w-[11ch] text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl" }, "Hablemos antes de cerrar el pedido"),
                        React.createElement("p", { className: "mt-6 max-w-[60ch] text-base leading-8 text-neutral-600 md:text-lg" }, "Escr\u00EDbenos para confirmar talla, disponibilidad, tiempos de entrega o cualquier duda antes de cerrar tu compra."),
                        React.createElement("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row" },
                            React.createElement("a", { href: buildWhatsAppHref('Hola, quiero asesoria comercial desde la pagina de contacto de Parallel Store.'), target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center rounded-full bg-neutral-950 px-7 py-3 text-[12px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-neutral-800" }, "Abrir WhatsApp"),
                            React.createElement("a", { href: "/deportes", className: "inline-flex items-center justify-center rounded-full border border-neutral-950 px-7 py-3 text-[12px] font-black uppercase tracking-[0.24em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white" }, "Volver al catalogo"))),
                    React.createElement("div", { className: "rounded-[28px] bg-neutral-950 p-6 text-white md:p-8" },
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-white/55" }, "Canal principal"),
                        React.createElement("div", { className: "mt-6 space-y-5" },
                            React.createElement("div", { className: "rounded-[22px] border border-white/10 bg-white/5 p-5" },
                                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.22em] text-white/55" }, "WhatsApp"),
                                React.createElement("p", { className: "mt-2 text-2xl font-black tracking-tight" }, contactConfig.whatsappDisplay),
                                React.createElement("p", { className: "mt-2 text-sm leading-6 text-white/72" }, "El canal mas directo para confirmar disponibilidad, talla y detalles de compra.")),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "rounded-[22px] border border-white/10 bg-white/5 p-5" },
                                    React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.22em] text-white/55" }, "Email"),
                                    React.createElement("p", { className: "mt-2 text-sm leading-7 text-white/82" }, contactConfig.email)),
                                React.createElement("div", { className: "rounded-[22px] border border-white/10 bg-white/5 p-5" },
                                    React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.22em] text-white/55" }, "Horario"),
                                    React.createElement("p", { className: "mt-2 text-sm leading-7 text-white/82" }, contactConfig.serviceHours))),
                            React.createElement("div", { className: "rounded-[22px] border border-white/10 bg-white/5 p-5" },
                                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.22em] text-white/55" }, "Cobertura"),
                                React.createElement("p", { className: "mt-2 text-sm leading-7 text-white/82" },
                                    "Atencion para clientes en ",
                                    contactConfig.city,
                                    ". Si ya viste una referencia en hombre, mujer, ninos o deportes, comparte el link para ayudarte mas rapido."))))))),
        React.createElement("section", { className: "mx-auto max-w-[1440px] px-4 py-16 md:px-8" },
            React.createElement("div", { className: "mb-10" },
                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500" }, "Como te ayudamos"),
                React.createElement("h2", { className: "mt-4 text-4xl font-black uppercase tracking-tight md:text-5xl" }, "Atencion para tu compra")),
            React.createElement("div", { className: "grid gap-6 md:grid-cols-3" }, supportTopics.map((topic) => (React.createElement("article", { key: topic.title, className: "rounded-[24px] border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-neutral-950" },
                React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500" }, "Soporte"),
                React.createElement("h3", { className: "mt-4 text-2xl font-black tracking-tight" }, topic.title),
                React.createElement("p", { className: "mt-4 text-sm leading-7 text-neutral-600" }, topic.text)))))),
        React.createElement("section", { className: "border-y border-neutral-200 bg-neutral-50" },
            React.createElement("div", { className: "mx-auto grid max-w-[1440px] gap-10 px-4 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500" }, "Antes de escribir"),
                    React.createElement("h2", { className: "mt-4 max-w-[12ch] text-4xl font-black uppercase tracking-tight md:text-5xl" }, "Escribenos con estos datos"),
                    React.createElement("p", { className: "mt-5 max-w-[54ch] text-sm leading-7 text-neutral-600" }, "Si compartes esta informacion, podremos ayudarte mas rapido.")),
                React.createElement("div", { className: "rounded-[28px] bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.06)] md:p-8" },
                    React.createElement("ul", { className: "space-y-4" }, contactChecklist.map((item) => (React.createElement("li", { key: item, className: "rounded-[20px] border border-neutral-200 px-5 py-4 text-sm leading-7 text-neutral-700" }, item))))))),
        React.createElement("section", { className: "mx-auto max-w-[1440px] px-4 py-16 md:px-8" },
            React.createElement("div", { className: "rounded-[32px] bg-[#1232d3] px-6 py-8 text-white md:px-10 md:py-10" },
                React.createElement("div", { className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.3em] text-white/65" }, "Informacion util"),
                        React.createElement("h2", { className: "mt-4 max-w-[11ch] text-4xl font-black uppercase tracking-tight md:text-5xl" }, "Lo que puedes esperar")),
                    React.createElement("div", { className: "grid gap-4 md:grid-cols-3" }, faqCards.map((card) => (React.createElement("article", { key: card.title, className: "rounded-[24px] border border-white/15 bg-white/10 p-5" },
                        React.createElement("p", { className: "text-[11px] font-black uppercase tracking-[0.22em] text-white/60" }, "Info"),
                        React.createElement("h3", { className: "mt-3 text-xl font-black tracking-tight" }, card.title),
                        React.createElement("p", { className: "mt-3 text-sm leading-6 text-white/82" }, card.text))))))))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
//# sourceMappingURL=ContactPage.js.map