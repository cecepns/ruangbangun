import { Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { usePublicData } from "../hooks/usePublicData";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage";
import PortfolioPage from "../pages/PortfolioPage";
import PortfolioDetailPage from "../pages/PortfolioDetailPage";
import ContactPage from "../pages/ContactPage";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";

export default function PublicLayout() {
  const data = usePublicData();
  if (data.loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/about-us" element={<AboutPage data={data} />} />
          <Route path="/service" element={<ServicePage data={data} />} />
          <Route path="/portfolio" element={<PortfolioPage data={data} />} />
          <Route path="/portfolio/:id" element={<PortfolioDetailPage data={data} />} />
          <Route path="/contact-us" element={<ContactPage data={data} />} />
        </Routes>
      </main>
      <FloatingWhatsApp phone={data.settings?.phone} />
      <Footer settings={data.settings} />
    </div>
  );
}
