import { useState } from "react";
import { createPortal } from "react-dom";
import { useOutletContext } from "react-router-dom";

export default function AdminTestimonialPage() {
  const {
    data,
    testimonialForm,
    setTestimonialForm,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useOutletContext();
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
    setEditingId(null);
    setTestimonialForm({ name: "", quote: "" });
  };

  const openAddModal = () => {
    setEditingId(null);
    setTestimonialForm({ name: "", quote: "" });
    setOpenModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setTestimonialForm({ name: item.name || "", quote: item.quote || "" });
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateTestimonial(editingId, testimonialForm);
    } else {
      await addTestimonial(testimonialForm);
    }
    setOpenModal(false);
    setEditingId(null);
  };

  return (
    <div className="card-ui">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Manajemen Testimoni</h3>
        <button
          onClick={openAddModal}
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          Tambah Testimoni
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-collapse overflow-hidden rounded-xl border">
          <thead className="bg-soft">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Nama</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Testimoni</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.testimonials.map((item) => (
              <tr key={item.id} className="border-t align-top">
                <td className="px-4 py-3 font-medium text-primary">{item.name}</td>
                <td className="px-4 py-3 text-sm leading-7 text-gray-700">{item.quote}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEditModal(item)}
                    className="mr-2 rounded-lg border border-blue-200 px-3 py-1 text-sm text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTestimonial(item.id)}
                    className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {!data.testimonials.length && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-gray-500">
                  Belum ada testimoni.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:items-center sm:p-4">
            <div className="my-6 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-4 sm:my-0 sm:p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-primary sm:text-xl">
                  {editingId ? "Edit Testimoni" : "Tambah Testimoni"}
                </h4>
                <button onClick={closeModal} className="rounded-lg border px-3 py-1 text-sm">
                  Tutup
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Nama klien"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm((prev) => ({ ...prev, name: e.target.value }))}
                />
                <textarea
                  className="min-h-32 w-full rounded-xl border p-3"
                  placeholder="Isi testimoni"
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm((prev) => ({ ...prev, quote: e.target.value }))}
                />
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button onClick={closeModal} className="rounded-lg border px-4 py-2">
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!testimonialForm.name.trim() || !testimonialForm.quote.trim()}
                >
                  {editingId ? "Simpan Perubahan" : "Simpan Testimoni"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
