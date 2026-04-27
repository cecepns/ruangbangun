/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Star,
  Wrench,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { fileUrl } from "../api";
import { FALLBACK_IMAGE, WHATSAPP } from "../constants/site";
import desainIcon from "../assets/our-services/desain.jpg";
import desainKonstruksiIcon from "../assets/our-services/desain-konstruksi.jpg";
import kontraktorIcon from "../assets/our-services/kontraktor.jpg";

export default function HomePage({ data }) {
  const [heroSwiper, setHeroSwiper] = useState(null);
  const hero = data.banners[0];
  const heroBanners = data.banners.length
    ? data.banners
    : [{ id: "default-hero", title: "Ruang Bangun", subtitle: hero?.subtitle, image: FALLBACK_IMAGE }];
  const latestPortfolio = data.portfolios.slice(0, 3);
  const ourServices = [
    {
      title: "Desain",
      description:
        "Kami hadir dengan layanan berfokus sepenuhnya pada desain. Layanan desain saja meliputi desain 3D dan gambar kerja.",
      icon: desainIcon,
    },
    {
      title: "Desain & Konstruksi",
      description:
        "Kami hadir dengan layanan desain dan pembangunan yang lengkap dan terintegrasi. Mulai dari tahap perencanaan hingga tahap konstruksi.",
      icon: desainKonstruksiIcon,
    },
    {
      title: "Kontraktor",
      description:
        "Layanan kontraktor ini dimulai dari tahap perencanaan hingga tahap konstruksi, kami memastikan bahwa setiap tahap dilaksanakan dengan cermat dan profesionalisme tinggi.",
      icon: kontraktorIcon,
    },
  ];
  const serviceCardStyles = [
    "bg-amber-50 border-amber-100",
    "bg-rose-50 border-rose-100",
    "bg-emerald-50 border-emerald-100",
  ];
  const reasonCardStyle = "!bg-[#F9F6F1] !border-[#EFE7DC]";
  const testimonialCardStyles = [
    "bg-yellow-50 border-yellow-100",
    "bg-cyan-50 border-cyan-100",
    "bg-fuchsia-50 border-fuchsia-100",
  ];
  const testimonials = data.testimonials.length
    ? data.testimonials
    : [{ id: 1, name: "Klien Ruang Bangun", quote: "Hasil desain dan pelaksanaannya sangat memuaskan." }];

  return (
    <main>
      <section className="relative mx-auto w-full py-0">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={setHeroSwiper}
          loop={heroBanners.length > 1}
          className="hero-swiper"
        >
          {heroBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative min-h-[420px] overflow-hidden md:min-h-[90vh]">
                <img
                  src={banner?.image ? fileUrl(banner.image) : FALLBACK_IMAGE}
                  alt={banner?.title || "Ruangbangun"}
                  className="h-[420px] w-full object-cover md:h-[90vh]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pointer-events-none absolute inset-0 z-30">
          <button
            type="button"
            aria-label="Previous banner"
            className="hero-nav-btn hero-prev"
            onClick={() => heroSwiper?.slidePrev()}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            className="hero-nav-btn hero-next"
            onClick={() => heroSwiper?.slideNext()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" data-aos="fade-up">
        <h2 className="section-title">Our Services</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {ourServices.map((service, idx) => (
            <article key={service.title} className={`card-ui ${serviceCardStyles[idx % serviceCardStyles.length]}`}>
              <img src={service.icon} alt={service.title} className="h-16 w-16" />
              <h3 className="mt-4 text-xl font-semibold text-primary">{service.title}</h3>
              <p className="mt-3 text-base leading-8">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="section-title">Portfolio Terbaru</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {latestPortfolio.map((item) => (
            <Link
              to={`/portfolio/${item.id}`}
              key={item.id}
              className="block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              data-aos="fade-up"
            >
              <img
                src={item.images?.[0] ? fileUrl(item.images[0]) : FALLBACK_IMAGE}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 text-base text-gray-500">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="section-title">Mengapa Memilih Ruang Bangun</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            [
              "Tenaga Profesional",
              "Direalisasikan oleh tenaga profesional yang memiliki kompetensi dan berpengalaman di bidangnya.",
              Building2,
            ],
            [
              "Free Desain 2D & 3D",
              "Kami berikan free desain 2D & 3D apabila Anda melanjutkan ke tahap pembangunan bersama kami.",
              SlidersHorizontal,
            ],
            [
              "Harga Kompetitif",
              "Dapatkan penawaran harga terbaik dari kami dengan mengonsultasikan rumah idaman Anda. Kami akan kalkulasikan pada Rencana Anggaran Biaya dengan menyesuaikan budget anda.",
              CheckCircle2,
            ],
            [
              "First Hand",
              "Pengerjaan pembangunan kami lakukan secara mandiri, tanpa mengalihkannya ke pihak lain. Dengan didukung tenaga ahli dan profesional, kami pastikan hasil konstruksi sesuai dengan rencana.",
              Wrench,
            ],
          ].map(([title, description, Icon]) => (
            <div key={title} className={`card-ui ${reasonCardStyle}`} data-aos="fade-up">
              <Icon className="text-secondary" />
              <p className="mt-3 text-lg font-semibold text-primary">{title}</p>
              <p className="mt-2 text-base leading-8">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="section-title">Testimoni</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={testimonials.length > 1}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="testimonial-swiper mt-6 pb-10"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className={`card-ui h-full ${testimonialCardStyles[idx % testimonialCardStyles.length]}`} data-aos="fade-up">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={`${item.id}-star-${starIdx}`} size={14} className="fill-[#D4A017] text-[#D4A017]" />
                  ))}
                </div>
                <p className="mt-3 min-h-[128px] flex-1 text-base leading-8 md:min-h-[160px]">{item.quote}</p>
                <p className="mt-4 font-semibold text-primary">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section
        className="mx-auto max-w-7xl rounded-3xl bg-primary px-6 py-10 text-white md:px-10"
        data-aos="zoom-in"
      >
        <h3 className="text-2xl font-bold">Butuh bantuan? Hubungi kami langsung</h3>
        <p className="mt-2 text-white/90">Konsultasikan ruang Anda bersama tim kami sekarang juga.</p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-primary"
        >
          Contact Us via WhatsApp
        </a>
      </section>
    </main>
  );
}
