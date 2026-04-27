import { useOutletContext } from "react-router-dom";

export default function AdminOverviewPage() {
  const { data } = useOutletContext();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {["banners", "services", "portfolios", "testimonials"].map((k) => (
        <div key={k} className="card-ui">
          <p className="text-sm text-gray-500">Total {k}</p>
          <p className="mt-2 text-3xl font-bold text-primary">{data[k]?.length || 0}</p>
        </div>
      ))}
    </div>
  );
}
