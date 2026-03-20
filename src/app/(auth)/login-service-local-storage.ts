import AsyncStorage from "@react-native-async-storage/async-storage";
import { IClientResponse } from "./IClient";

const CLIENT = "client";
const TOKEN = "token";

export async function saveTokenLocalStorage(data: IClientResponse) {
  await AsyncStorage.setItem(TOKEN, JSON.stringify(data.name));
}

export async function saveClientLocalStorage(theme: IClientResponse) {
  await AsyncStorage.setItem(CLIENT, JSON.stringify(theme));
}

export async function getTokenLocalStorage(): Promise<string> {
  const data = await AsyncStorage.getItem(TOKEN);
  return data ? JSON.parse(data) : "";
}

export async function getClientLocalStorage() {
  const data = await AsyncStorage.getItem(CLIENT);
  return data ? JSON.parse(data) : null;
}

export async function removeClientLocalStorage() {
  await AsyncStorage.removeItem(CLIENT);
  await AsyncStorage.removeItem(TOKEN);
}
