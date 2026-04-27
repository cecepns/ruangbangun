import { useOutletContext } from "react-router-dom";

export default function AdminSettingsPage() {
  const { data, setData, saveSettings } = useOutletContext();

  return (
    <div className="card-ui">
      <h3 className="text-xl font-semibold text-primary">Manajemen Settings</h3>
      {["phone", "email", "address", "maps_url"].map((key) => (
        <input
          key={key}
          className="mt-3 w-full rounded-xl border p-3"
          placeholder={key}
          value={data.settings?.[key] || ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              settings: { ...(prev.settings || {}), [key]: e.target.value },
            }))
          }
        />
      ))}
      <label className="mt-4 block text-sm font-medium">Judul About Us</label>
      <input
        className="mt-2 w-full rounded-xl border p-3"
        placeholder="About Us"
        value={data.settings?.about_us_title || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            settings: { ...(prev.settings || {}), about_us_title: e.target.value },
          }))
        }
      />
      <label className="mt-4 block text-sm font-medium">Tentang Kami</label>
      <textarea
        className="mt-2 h-36 w-full rounded-xl border p-3"
        value={data.settings?.about_us || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            settings: { ...(prev.settings || {}), about_us: e.target.value },
          }))
        }
      />
      <button onClick={saveSettings} className="mt-4 rounded-lg bg-primary px-4 py-2 text-white">
        Simpan Settings
      </button>
    </div>
  );
}
