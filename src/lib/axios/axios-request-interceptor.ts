import { getClientLocalStorage } from "@/src/features/auth/login-service-local-storage";
import { api } from "./axios";

api.interceptors.request.use(async (config) => {
  const auth = await getClientLocalStorage();

  if (config.url?.includes("/login")) {
    return config;
  }

  if (auth) {
    config.headers.Authorization = `Bearer ${auth}`;
  }

  return config;
});
