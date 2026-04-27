import { useEffect, useState } from "react";
import { api } from "../api";

export function usePublicData() {
  const [state, setState] = useState({
    banners: [],
    services: [],
    portfolios: [],
    testimonials: [],
    settings: null,
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      api.get("/banners"),
      api.get("/services"),
      api.get("/portfolios"),
      api.get("/testimonials"),
      api.get("/settings"),
    ])
      .then(([banners, services, portfolios, testimonials, settings]) =>
        setState({
          banners: banners.data,
          services: services.data,
          portfolios: portfolios.data,
          testimonials: testimonials.data,
          settings: settings.data,
          loading: false,
        }),
      )
      .catch(() => setState((prev) => ({ ...prev, loading: false })));
  }, []);

  return state;
}
