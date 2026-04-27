import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicLayout from "./layouts/PublicLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminBannerPage from "./pages/admin/AdminBannerPage";
import AdminTestimonialPage from "./pages/admin/AdminTestimonialPage";
import AdminPortfolioPage from "./pages/admin/AdminPortfolioPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/*"
          element={localStorage.getItem("rb_token") ? <AdminLayout /> : <Navigate to="/admin/login" />}
        >
          <Route index element={<AdminOverviewPage />} />
          <Route path="banner" element={<AdminBannerPage />} />
          <Route path="testimonial" element={<AdminTestimonialPage />} />
          <Route path="portfolio" element={<AdminPortfolioPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </>
  );
}
