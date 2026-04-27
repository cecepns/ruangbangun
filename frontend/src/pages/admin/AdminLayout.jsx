import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Building2, LayoutDashboard, LogOut, Menu, MessageSquareQuote, Settings, SlidersHorizontal, X } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../api";

const createDefaultPortfolioForm = () => ({
  title: "",
  category: "",
  specs: {
    lebar_depan: "",
    luas_tanah: "",
    kamar_tidur: "",
    luas_bangunan: "",
    kamar_mandi: "",
    kamar_art: "",
    lantai: "",
    kapasitas_mobil: "",
    fasilitas_pendukung: "",
  },
  description: "",
  images: [],
  existingImages: [],
});

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({
    banners: [],
    services: [],
    portfolios: [],
    testimonials: [],
    settings: {},
  });
  const [testimonialForm, setTestimonialForm] = useState({ name: "", quote: "" });
  const [portfolioForm, setPortfolioForm] = useState(createDefaultPortfolioForm());

  const token = localStorage.getItem("rb_token");
  const navigate = useNavigate();

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const confirmAction = (message) =>
    new Promise((resolve) => {
      const toastId = toast.info(
        <div className="space-y-3">
          <p className="text-sm">{message}</p>
          <div className="flex gap-2">
            <button
              className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white"
              onClick={() => {
                toast.dismiss(toastId);
                resolve(true);
              }}
            >
              Ya, lanjut
            </button>
            <button
              className="rounded-md border px-3 py-1 text-xs font-semibold"
              onClick={() => {
                toast.dismiss(toastId);
                resolve(false);
              }}
            >
              Batal
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        },
      );
    });

  const refreshData = async () => {
    const [b, s, p, t, st] = await Promise.all([
      api.get("/banners"),
      api.get("/services"),
      api.get("/portfolios"),
      api.get("/testimonials"),
      api.get("/settings"),
    ]);
    setData({ banners: b.data, services: s.data, portfolios: p.data, testimonials: t.data, settings: st.data || {} });
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    refreshData();
  }, [token, navigate]);

  const addBanner = async (file) => {
    if (!file) {
      toast.warning("Pilih file banner terlebih dahulu");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("title", `Banner ${Date.now()}`);
      fd.append("subtitle", "Ruang Bangun");
      fd.append("image", file);
      await api.post("/admin/banners", fd, {
        headers: { ...authHeaders.headers, "Content-Type": "multipart/form-data" },
      });
      await refreshData();
      toast.success("Banner berhasil ditambahkan");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambahkan banner");
    }
  };

  const deleteBanner = async (id) => {
    const ok = await confirmAction("Hapus banner ini?");
    if (!ok) return;
    try {
      await api.delete(`/admin/banners/${id}`, authHeaders);
      await refreshData();
      toast.success("Banner berhasil dihapus");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus banner");
    }
  };

  const addService = async () => {
    try {
      await api.post(
        "/admin/services",
        { title: "Layanan Baru", description: "Deskripsi layanan baru." },
        authHeaders,
      );
      await refreshData();
      toast.success("Service berhasil ditambahkan");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambahkan service");
    }
  };

  const deleteService = async (id) => {
    const ok = await confirmAction("Hapus service ini?");
    if (!ok) return;
    try {
      await api.delete(`/admin/services/${id}`, authHeaders);
      await refreshData();
      toast.success("Service berhasil dihapus");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus service");
    }
  };

  const addTestimonial = async (payload = testimonialForm) => {
    try {
      await api.post("/admin/testimonials", { name: payload.name, quote: payload.quote }, authHeaders);
      setTestimonialForm({ name: "", quote: "" });
      await refreshData();
      toast.success("Testimoni berhasil ditambahkan");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambahkan testimoni");
      throw error;
    }
  };

  const updateTestimonial = async (id, payload) => {
    try {
      await api.put(`/admin/testimonials/${id}`, { name: payload.name, quote: payload.quote }, authHeaders);
      await refreshData();
      toast.success("Testimoni berhasil diperbarui");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memperbarui testimoni");
      throw error;
    }
  };

  const deleteTestimonial = async (id) => {
    const ok = await confirmAction("Hapus testimoni ini?");
    if (!ok) return;
    try {
      await api.delete(`/admin/testimonials/${id}`, authHeaders);
      await refreshData();
      toast.success("Testimoni berhasil dihapus");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus testimoni");
    }
  };

  const addPortfolio = async (payload = portfolioForm) => {
    try {
      const fd = new FormData();
      fd.append("title", payload.title);
      fd.append("category", payload.category);
      fd.append("description", payload.description);
      fd.append("specs", JSON.stringify(payload.specs));
      Array.from(payload.images || []).forEach((f) => fd.append("images", f));
      await api.post("/admin/portfolios", fd, {
        headers: { ...authHeaders.headers, "Content-Type": "multipart/form-data" },
      });
      setPortfolioForm(createDefaultPortfolioForm());
      await refreshData();
      toast.success("Portfolio berhasil ditambahkan");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambahkan portfolio");
      throw error;
    }
  };

  const updatePortfolio = async (id, payload) => {
    try {
      const fd = new FormData();
      fd.append("title", payload.title);
      fd.append("category", payload.category);
      fd.append("description", payload.description);
      fd.append("specs", JSON.stringify(payload.specs));
      fd.append("keep_images", JSON.stringify(payload.existingImages || []));
      Array.from(payload.images || []).forEach((f) => fd.append("images", f));
      await api.put(`/admin/portfolios/${id}`, fd, {
        headers: { ...authHeaders.headers, "Content-Type": "multipart/form-data" },
      });
      setPortfolioForm(createDefaultPortfolioForm());
      await refreshData();
      toast.success("Portfolio berhasil diperbarui");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memperbarui portfolio");
      throw error;
    }
  };

  const deletePortfolio = async (id) => {
    const ok = await confirmAction("Hapus portfolio ini?");
    if (!ok) return;
    try {
      await api.delete(`/admin/portfolios/${id}`, authHeaders);
      await refreshData();
      toast.success("Portfolio berhasil dihapus");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus portfolio");
    }
  };

  const saveSettings = async () => {
    try {
      await api.put("/admin/settings", data.settings, authHeaders);
      toast.success("Settings berhasil disimpan");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan settings");
    }
  };

  const menu = [
    ["/admin", "Dashboard", LayoutDashboard, true],
    ["/admin/banner", "Manajemen Banner", SlidersHorizontal],
    ["/admin/testimonial", "Manajemen Testimoni", MessageSquareQuote],
    ["/admin/portfolio", "Manajemen Portfolio", Building2],
    ["/admin/settings", "Manajemen Settings", Settings],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
        <h2 className="text-lg font-bold text-primary">Admin Ruangbangun</h2>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="rounded-lg border p-2 text-primary"
          aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup sidebar"
        />
      )}

      <div className="flex min-h-[calc(100vh-61px)] md:min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r bg-white p-5 transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between md:block">
            <h2 className="text-xl font-bold text-primary">Admin Ruangbangun</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg border p-2 text-primary md:hidden"
              aria-label="Tutup sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-2">
            {menu.map(([to, label, Icon, end]) => (
              <NavLink
                key={to}
                to={to}
                end={Boolean(end)}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center gap-2 rounded-xl p-3 text-left ${
                    isActive ? "bg-primary text-white" : "hover:bg-soft"
                  }`
                }
              >
                <Icon size={18} /> {label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem("rb_token");
                navigate("/admin/login");
              }}
              className="flex w-full items-center gap-2 rounded-xl p-3 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <Outlet
            context={{
              data,
              setData,
              portfolioForm,
              setPortfolioForm,
              addBanner,
              deleteBanner,
              addService,
              deleteService,
              testimonialForm,
              setTestimonialForm,
              addTestimonial,
              updateTestimonial,
              deleteTestimonial,
              addPortfolio,
              updatePortfolio,
              deletePortfolio,
              saveSettings,
            }}
          />
        </main>
      </div>
    </div>
  );
}
