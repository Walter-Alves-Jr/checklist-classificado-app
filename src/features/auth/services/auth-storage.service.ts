import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "../types/auth-response";

const TOKEN_KEY = "@app_token";

export const authStorage = {
  async save(data: AuthResponse["token"]) {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  },

  async get() {
    const data = await AsyncStorage.getItem(TOKEN_KEY);
    return data ? JSON.parse(data) : null;
  },

  async remove() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
