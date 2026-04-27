/* eslint-disable react/prop-types */
import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "../../constants/site";

function toWhatsAppLink(phone) {
  if (!phone) return WHATSAPP;
  if (phone.startsWith("http://") || phone.startsWith("https://")) return phone;

  const digits = phone.replace(/\D/g, "");
  if (!digits) return WHATSAPP;

  if (digits.startsWith("62")) return `https://wa.me/${digits}`;
  if (digits.startsWith("0")) return `https://wa.me/62${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

export default function FloatingWhatsApp({ phone }) {
  const waLink = toWhatsAppLink(phone);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi via WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-green-400/70 animate-ping" />
      <MessageCircle size={24} />
    </a>
  );
}
