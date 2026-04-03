import { queryClient } from "@/src/lib/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { ClienteResponse } from "../../../types/Cliente.type";
import { useClientes } from "../../use-clientes";

type LoginParams = {
  username: string;
  password: string;
};

export function useAuthenticateMutation() {
  const { authenticate } = useClientes();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: LoginParams): Promise<ClienteResponse> => {
      const data = await authenticate(username, password);

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },

    onSuccess: async (response: ClienteResponse) => {
      queryClient.setQueryData(["cliente"], response);
      await AsyncStorage.setItem("cliente", JSON.stringify(response));
    },
  });
}
