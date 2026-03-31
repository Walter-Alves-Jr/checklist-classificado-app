import { authStorage } from "@/src/features/auth/services/auth-storage.service";
import { api } from "./axios";

api.interceptors.request.use(async (config) => {
  const session = await authStorage.get();

  if (config.url?.includes("/login")) {
    return config;
  }

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});
