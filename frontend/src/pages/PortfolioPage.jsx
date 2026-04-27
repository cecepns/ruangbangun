/* eslint-disable react/prop-types */
import { Bath, BedDouble, Building2, Car, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { fileUrl } from "../api";
import { FALLBACK_IMAGE } from "../constants/site";

export default function PortfolioPage({ data }) {
  const displayValue = (value) => {
    if (value === null || value === undefined) return "-";
    const normalized = String(value).trim();
    return normalized ? normalized : "-";
  };

  const specItems = [
    { key: "kamar_tidur", label: "K. Tidur", icon: BedDouble },
    { key: "kamar_mandi", label: "K. Mandi", icon: Bath },
    { key: "lantai", label: "Lantai", icon: Layers3 },
    { key: "kapasitas_mobil", label: "Mobil", icon: Car },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Portfolio</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {data.portfolios.map((item) => (
          <Link
            key={item.id}
            to={`/portfolio/${item.id}`}
            className="block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative">
              <img
                src={item.images?.[0] ? fileUrl(item.images[0]) : FALLBACK_IMAGE}
                alt={displayValue(item.title)}
                className="h-52 w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {displayValue(item.category)}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-primary">{displayValue(item.title)}</h3>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {specItems.map((spec) => {
                  const Icon = spec.icon;
                  const value = item.specs?.[spec.key];
                  return (
                    <div key={spec.key} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-soft px-2 py-2">
                      <Icon size={15} className="text-secondary" />
                      <span className="text-xs text-gray-700">
                        {spec.label}: <span className="font-medium text-primary">{displayValue(value)}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-secondary">
                <Building2 size={15} />
                Lihat detail proyek
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
