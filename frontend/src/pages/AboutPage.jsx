/* eslint-disable react/prop-types */
import { FALLBACK_IMAGE, fallbackAbout } from "../constants/site";

export default function AboutPage({ data }) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center px-4 py-12">
      <div className="grid w-full items-center gap-8 md:grid-cols-2">
        <div>
      <h1 className="section-title">About Us</h1>
          <p className="mt-5 leading-8">{data.settings?.about_us || fallbackAbout}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={FALLBACK_IMAGE}
            alt="Logo Ruang Bangun"
            className="h-auto w-full max-w-xs rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
