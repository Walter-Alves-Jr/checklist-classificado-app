import { env } from "@/env";
import axios from "axios";

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
