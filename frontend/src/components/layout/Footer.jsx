/* eslint-disable react/prop-types */
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { fallbackAbout, WHATSAPP } from "../../constants/site";

export default function Footer({ settings }) {
  return (
    <footer className="mt-16 border-t bg-soft">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h4 className="font-bold text-primary">Ruang Bangun</h4>
          <p className="mt-3 text-base leading-8">{settings?.about_us || fallbackAbout}</p>
        </div>
        <div>
          <h4 className="font-bold text-primary">Kontak</h4>
          <div className="mt-3 space-y-2 text-base">
            <p className="flex items-center gap-2">
              <Phone size={16} />
              {settings?.phone || "62 857-1188-3099"}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} />
              {settings?.email || "hello@ruangbangun.id"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              {settings?.address || "Jakarta, Indonesia"}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary">Butuh bantuan?</h4>
          <p className="mt-3 text-base">Konsultasikan ruang Anda bersama kami.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white"
          >
            Hubungi via WhatsApp <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
