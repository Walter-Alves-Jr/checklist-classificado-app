import { removerSessaoUsuarioStorage } from "@/src/features/auth/helpers/remover-sessao-usuario-storage";
import { STORAGE } from "@/src/shared/consts/storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://192.168.0.105:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.skipAuth) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      await removerSessaoUsuarioStorage();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem(STORAGE.TOKEN_USUARIO);

    if (config.url?.includes("/(auth)/login")) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
