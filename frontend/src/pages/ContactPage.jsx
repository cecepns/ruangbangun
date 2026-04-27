/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WHATSAPP } from "../constants/site";

const defaultFaqs = [
  {
    question: "Layanan apa saja yang diberikan oleh Ruang Bangun?",
    answer:
      "Ruang Bangun menyediakan layanan desain saja, desain dan konstruksi, dan kontraktor saja untuk arsitektur dan interior.",
  },
  {
    question: "Apa saja hal yang dipersiapkan untuk pengerjaan proyek desain interior oleh Ruang Bangun?",
    answer: [
      "Anda harus mempersiapkan informasi lengkap terkait:",
      "Informasi tentang lokasi lahan dan ukuran atau dimensi lahan.",
      "Preferensi gaya desain interior yang Anda sukai, seperti desain interior kamar tidur, interior ruang tamu minimalis, interior ruang tamu mewah modern, interior ruang keluarga klasik, dan sebagainya.",
    ],
  },
  {
    question: "Kota mana saja yang dicakup oleh Ruang Bangun?",
    answer:
      "Untuk pemesanan jasa desain saja, kami mencakup berbagai daerah di Indonesia maupun mancanegara. Namun, untuk pemesanan konstruksi cakupan kami meliputi area sekitar Jakarta, Bogor, Depok, Tangerang, Bekasi (Jabodetabek) dan Lampung.",
  },
  {
    question: "Apa yang terjadi jika desain pertama yang diberikan oleh Ruang Bangun tidak sesuai dengan keinginan?",
    answer: "Apabila desain yang disajikan masih belum sesuai ekspektasi akan diberikan kesempatan revisi sebanyak tiga kali.",
  },
  {
    question: "Apakah ada paket desain hemat yang dilayani oleh Ruang Bangun?",
    answer: "Tentu saja ada. Silakan hubungi kami untuk detailnya.",
  },
  {
    question: "Apakah Ruang Bangun melayani jasa konstruksi atau pembangunan rumah?",
    answer:
      "Selain jasa desain interior, kami juga menghadirkan layanan konstruksi rumah yang dimulai dari pekerjaan struktural dan arsitektural baik fasad ataupun interior furniture.",
  },
];

export default function ContactPage({ data }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const faqs = defaultFaqs;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Contact Us</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 md:text-lg">
        Konsultasikan ruang Anda bersama kami. Kami akan membuat desain yang memiliki nilai estetika dan sesuai
        dengan kebutuhan dan kepribadian Anda.
      </p>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-white">
        Contact Us
      </a>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="card-ui">{data.settings?.email || "hello@ruangbangun.id"}</div>
        <div className="card-ui">{data.settings?.phone || "62 857-1188-3099"}</div>
      </div>
      <h2 className="mt-10 text-2xl font-bold text-primary">FAQ</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="card-ui p-0">
            <button
              type="button"
              onClick={() => setOpenFaqIndex((prev) => (prev === idx ? -1 : idx))}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              aria-expanded={openFaqIndex === idx}
            >
              <span className="font-semibold text-primary">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-primary transition-transform ${openFaqIndex === idx ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`${openFaqIndex === idx ? "block" : "hidden"} px-4 pb-4 text-base leading-7`}>
              {Array.isArray(faq.answer) ? (
                faq.answer.map((line, lineIdx) => (
                  <p key={lineIdx} className={lineIdx === 0 ? "" : "mt-2"}>
                    {line}
                  </p>
                ))
              ) : (
                <p>{faq.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
