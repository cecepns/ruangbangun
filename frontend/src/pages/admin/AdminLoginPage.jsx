import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/login", { email, password });
      localStorage.setItem("rb_token", data.token);
      navigate("/admin");
    } catch {
      setError("Login gagal. Cek email/password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-500">Gunakan akun admin untuk masuk dashboard.</p>
        <input
          className="mt-5 w-full rounded-xl border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="mt-3 w-full rounded-xl border p-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button className="mt-5 w-full rounded-xl bg-primary p-3 font-semibold text-white">Masuk</button>
      </form>
    </div>
  );
}
