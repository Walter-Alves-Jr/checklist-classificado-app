import { authStorage } from "@/src/features/auth/services/auth-storage.service";
import { queryClient } from "../react-query";
import { api } from "./axios";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.skipAuth) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      await authStorage.remove();
      queryClient.clear();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
