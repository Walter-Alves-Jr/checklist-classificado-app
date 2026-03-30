import { removeClientLocalStorage } from "@/src/features/auth/login-service-local-storage";
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
      await removeClientLocalStorage();
      queryClient.clear();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
