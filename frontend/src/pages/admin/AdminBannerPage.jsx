import { useOutletContext } from "react-router-dom";
import { fileUrl } from "../../api";

export default function AdminBannerPage() {
  const { data, addBanner, deleteBanner } = useOutletContext();

  return (
    <div className="card-ui">
      <h3 className="text-xl font-semibold text-primary">Manajemen Banner</h3>
      <input id="banner-file" type="file" className="mt-4" />
      <button
        onClick={() => {
          const input = document.getElementById("banner-file");
          addBanner(input?.files?.[0] || null);
        }}
        className="mt-3 rounded-lg bg-primary px-4 py-2 text-white"
      >
        Tambah Banner
      </button>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {data.banners.map((b) => (
          <div key={b.id} className="rounded-xl border p-2">
            <img src={fileUrl(b.image)} alt={b.title} className="h-28 w-full rounded-xl object-cover" />
            <button
              onClick={() => deleteBanner(b.id)}
              className="mt-2 w-full rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
