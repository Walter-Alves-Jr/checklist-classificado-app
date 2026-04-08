import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { SessaoUsuario } from "../../../types/sessao-usuario";

export function useSessaoUsuario() {
  return useQuery({
    queryKey: ["sessao_usuario"],
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async (): Promise<SessaoUsuario | null> => {
      const token = await AsyncStorage.getItem("sessao_usuario");

      if (!token) return null;

      return JSON.parse(token) as SessaoUsuario;
    },
  });
}
