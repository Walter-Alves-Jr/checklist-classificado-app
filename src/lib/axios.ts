import { env } from "@/env";
import axios from "axios";
import {
  getTokenLocalStorage,
  removeClientLocalStorage,
} from "../app/(auth)/login-service-local-storage";

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  // withCredentials: true,
});

if (env.EXPO_PUBLIC_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 2000)),
    );

    return config;
  });
}

api.interceptors.request.use(async (config) => {
  const auth = await getTokenLocalStorage();

  if (config.url?.includes("/login")) {
    return config;
  }

  if (auth) {
    config.headers.Authorization = `Bearer ${auth}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeClientLocalStorage();
    }

    return Promise.reject(error);
  },
);
