const whatsappDisplay = '+57 323 825 3871';
const whatsappPhone = whatsappDisplay.replace(/\D/g, '');

export const contactConfig = {
  whatsappPhone,
  whatsappDisplay,
  email: 'ventas@paralelstore.co',
  serviceHours: 'Lun a Sab - 9:00 AM a 7:00 PM',
  city: 'Colombia'
};

export function buildWhatsAppHref(message: string) {
  const normalizedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappPhone}?text=${normalizedMessage}`;
}
