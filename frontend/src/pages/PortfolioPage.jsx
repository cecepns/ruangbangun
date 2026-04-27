/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fileUrl } from "../api";
import { FALLBACK_IMAGE } from "../constants/site";

export default function PortfolioPage({ data }) {
  const tabs = [
    { id: "desain-arsitek", label: "DESAIN ARSITEK" },
    { id: "hasil-konstruksi", label: "HASIL KONTRUKSI" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const displayValue = (value) => {
    if (value === null || value === undefined) return "-";
    const normalized = String(value).trim();
    return normalized ? normalized : "-";
  };

  const filteredPortfolios = useMemo(() => {
    return data.portfolios.filter((item) => {
      const normalizedCategory = (item.category || "").trim().toLowerCase();

      if (activeTab === "desain-arsitek") {
        return normalizedCategory === "desain arsitek";
      }

      if (activeTab === "hasil-konstruksi") {
        // Keep compatibility with old typo data: "kontruksi".
        return normalizedCategory === "hasil konstruksi" || normalizedCategory === "hasil kontruksi";
      }

      return true;
    });
  }, [activeTab, data.portfolios]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Portfolio</h1>
      <div className="mt-8 border-b border-secondary/30 md:max-w-4xl md:mx-auto">
        <div className="grid grid-cols-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-4 px-2 pb-3 text-center text-[11px] font-semibold tracking-[0.12em] transition md:text-lg
                ${isActive ? "border-secondary text-secondary" : "border-transparent text-primary/70 hover:text-primary"}`}
            >
              {tab.label}
            </button>
          );
        })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filteredPortfolios.map((item) => (
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
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-secondary">
                <Building2 size={15} />
                Lihat detail proyek
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!filteredPortfolios.length && <p className="mt-10 text-center text-sm text-gray-500">Belum ada portfolio pada kategori ini.</p>}
    </section>
  );
}
