import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://api.kingcreativestudio.my.id/ruangbangun/api";

export const api = axios.create({ baseURL });

export const fileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${(import.meta.env.VITE_API_HOST || "https://api.kingcreativestudio.my.id/ruangbangun").replace(/\/$/, "")}${clean}`;
};
