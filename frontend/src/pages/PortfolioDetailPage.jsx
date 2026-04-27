/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
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

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {item.images?.length > 1 ? (
        <Swiper spaceBetween={16} slidesPerView={1}>
          {item.images.map((img) => (
            <SwiperSlide key={img}>
              <img src={fileUrl(img)} alt={item.title} className="h-screen w-full rounded-3xl object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={item.images?.[0] ? fileUrl(item.images[0]) : FALLBACK_IMAGE}
          alt={item.title}
          className="h-screen w-full rounded-3xl object-cover"
        />
      )}
      <h1 className="mt-8 text-3xl font-bold text-primary">{item.title}</h1>
      <div
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: item.description || "<p>Belum ada deskripsi.</p>" }}
      />
    </section>
  );
}
