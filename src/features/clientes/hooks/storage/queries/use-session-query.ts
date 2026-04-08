import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { ClienteResponse } from "../../../types/Cliente.type";

export function useSession() {
  return useQuery({
    queryKey: ["cliente"],
    queryFn: async (): Promise<ClienteResponse | null> => {
      const token = await AsyncStorage.getItem("token");

      if (!token) return null;

      return JSON.parse(token);
    },
  });
}
