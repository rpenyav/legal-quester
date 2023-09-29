import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();

    for (const key of Object.keys(params)) {
      const param = params[key];

      if (Array.isArray(param)) {
        for (const value of param) {
          searchParams.append(key, value);
        }
      } else {
        searchParams.set(key, param);
      }
    }

    return searchParams.toString();
  },
});

// Interceptor para añadir el token antes de cada solicitud.
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
