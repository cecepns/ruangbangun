import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import { createPortal } from "react-dom";
import { fileUrl } from "../../api";

export default function AdminPortfolioPage() {
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { data, portfolioForm, setPortfolioForm, addPortfolio, updatePortfolio, deletePortfolio } = useOutletContext();

  const handleSavePortfolio = async () => {
    if (editingId) {
      await updatePortfolio(editingId, portfolioForm);
    } else {
      await addPortfolio(portfolioForm);
    }
    setOpenModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setPortfolioForm({
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
  };

  const openAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setPortfolioForm({
      title: item.title || "",
      category: item.category || "",
      specs: {
        lebar_depan: item.specs?.lebar_depan || "",
        luas_tanah: item.specs?.luas_tanah || "",
        kamar_tidur: item.specs?.kamar_tidur || "",
        luas_bangunan: item.specs?.luas_bangunan || "",
        kamar_mandi: item.specs?.kamar_mandi || "",
        kamar_art: item.specs?.kamar_art || "",
        lantai: item.specs?.lantai || "",
        kapasitas_mobil: item.specs?.kapasitas_mobil || "",
        fasilitas_pendukung: item.specs?.fasilitas_pendukung || "",
      },
      description: item.description || "",
      images: [],
      existingImages: item.images || [],
    });
    setOpenModal(true);
  };

  return (
    <div className="card-ui">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Manajemen Portfolio</h3>
        <button onClick={openAddModal} className="rounded-lg bg-primary px-4 py-2 text-white">
          Tambah Portfolio
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-collapse overflow-hidden rounded-xl border">
          <thead className="bg-soft">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Gambar</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Judul</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Kategori</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.portfolios.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">
                  {p.images?.[0] ? (
                    <img src={fileUrl(p.images[0])} alt={p.title} className="h-14 w-20 rounded-lg object-cover" />
                  ) : (
                    <div className="h-14 w-20 rounded-lg bg-gray-100" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-gray-600">{p.category || "-"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEditModal(p)}
                    className="mr-2 rounded-lg border border-blue-200 px-3 py-1 text-sm text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePortfolio(p.id)}
                    className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {!data.portfolios.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                  Belum ada data portfolio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:items-center sm:p-4">
            <div className="my-6 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-4 sm:my-0 sm:p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-primary sm:text-xl">
                  {editingId ? "Edit Portfolio" : "Tambah Portfolio"}
                </h4>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border px-3 py-1 text-sm"
                >
                  Tutup
                </button>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input
                  className="rounded-xl border p-3"
                  placeholder="Judul"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm((p) => ({ ...p, title: e.target.value }))}
                />
                <input
                  className="rounded-xl border p-3"
                  placeholder="Kategori"
                  value={portfolioForm.category}
                  onChange={(e) => setPortfolioForm((p) => ({ ...p, category: e.target.value }))}
                />
                {Object.keys(portfolioForm.specs).map((k) => (
                  <input
                    key={k}
                    className="rounded-xl border p-3"
                    placeholder={k.replaceAll("_", " ")}
                    value={portfolioForm.specs[k]}
                    onChange={(e) =>
                      setPortfolioForm((p) => ({
                        ...p,
                        specs: { ...p.specs, [k]: e.target.value },
                      }))
                    }
                  />
                ))}
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-primary">Deskripsi (React Quill)</label>
                <ReactQuill
                  value={portfolioForm.description}
                  onChange={(v) => setPortfolioForm((p) => ({ ...p, description: v }))}
                  className="mt-2 bg-white"
                />
              </div>

              <input
                type="file"
                multiple
                className="mt-4"
                onChange={(e) => setPortfolioForm((p) => ({ ...p, images: e.target.files }))}
              />
              {editingId && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-primary">Gambar saat ini</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                    {(portfolioForm.existingImages || []).map((img) => (
                      <div key={img} className="rounded-xl border p-2">
                        <img src={fileUrl(img)} alt="portfolio" className="h-20 w-full rounded-lg object-cover" />
                        <button
                          onClick={() =>
                            setPortfolioForm((prev) => ({
                              ...prev,
                              existingImages: prev.existingImages.filter((image) => image !== img),
                            }))
                          }
                          className="mt-2 w-full rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
                        >
                          Hapus gambar ini
                        </button>
                      </div>
                    ))}
                    {!portfolioForm.existingImages?.length && (
                      <p className="col-span-full text-sm text-gray-500">Tidak ada gambar tersisa.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setOpenModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border px-4 py-2"
                >
                  Batal
                </button>
                <button onClick={handleSavePortfolio} className="rounded-lg bg-primary px-4 py-2 text-white">
                  {editingId ? "Simpan Perubahan" : "Simpan Portfolio"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
