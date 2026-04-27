import { useOutletContext } from "react-router-dom";

export default function AdminServicePage() {
  const { data, addService, deleteService } = useOutletContext();

  return (
    <div className="card-ui">
      <h3 className="text-xl font-semibold text-primary">Manajemen Service</h3>
      <button onClick={addService} className="mt-3 rounded-lg bg-primary px-4 py-2 text-white">
        Tambah Service
      </button>
      <div className="mt-4 space-y-3">
        {data.services.map((s) => (
          <div key={s.id} className="rounded-xl border p-3">
            <p className="font-semibold">{s.title}</p>
            <p className="text-sm">{s.description}</p>
            <button
              onClick={() => deleteService(s.id)}
              className="mt-2 rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
