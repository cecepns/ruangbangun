/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
import { Bath, BedDouble, Car, Layers3, MoveHorizontal, Ruler, Sofa, Square, Warehouse } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { fileUrl } from "../api";
import { FALLBACK_IMAGE } from "../constants/site";

export default function PortfolioDetailPage({ data }) {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const item = useMemo(
    () => data.portfolios.find((portfolio) => String(portfolio.id) === String(id)),
    [data.portfolios, id],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!item) return <div className="mx-auto max-w-7xl px-4 py-20">Portfolio tidak ditemukan.</div>;

  const specMeta = {
    lebar_depan: { label: "Lebar Depan", icon: MoveHorizontal },
    luas_tanah: { label: "Luas Tanah", icon: Square },
    kamar_tidur: { label: "Kamar Tidur", icon: BedDouble },
    luas_bangunan: { label: "Luas Bangunan", icon: Ruler },
    kamar_mandi: { label: "Kamar Mandi", icon: Bath },
    kamar_art: { label: "Kamar ART", icon: Warehouse },
    lantai: { label: "Lantai", icon: Layers3 },
    kapasitas_mobil: { label: "Kapasitas Mobil", icon: Car },
    fasilitas_pendukung: { label: "Fasilitas Pendukung", icon: Sofa },
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {item.images?.length > 1 ? (
        <Swiper spaceBetween={16} slidesPerView={1}>
          {item.images.map((img) => (
            <SwiperSlide key={img}>
              <img src={fileUrl(img)} alt={item.title} className="h-[420px] w-full rounded-3xl object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={item.images?.[0] ? fileUrl(item.images[0]) : FALLBACK_IMAGE}
          alt={item.title}
          className="h-[420px] w-full rounded-3xl object-cover"
        />
      )}
      <h1 className="mt-8 text-3xl font-bold text-primary">{item.title}</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {Object.entries(item.specs || {}).map(([k, v]) => (
          <div key={k} className="flex items-center gap-3 rounded-xl border p-3 text-base leading-7">
            {(() => {
              const Icon = specMeta[k]?.icon || Square;
              const label = specMeta[k]?.label || k.replaceAll("_", " ");
              return (
                <>
                  <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">{label}</p>
                    <p className="text-sm text-gray-700">{String(v) || "-"}</p>
                  </div>
                </>
              );
            })()}
          </div>
        ))}
      </div>
      <div
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: item.description || "<p>Belum ada deskripsi.</p>" }}
      />
    </section>
  );
}
