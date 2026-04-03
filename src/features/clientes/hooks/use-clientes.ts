import { useToast } from "@/src/shared/components/Toast";
import { useCallback } from "react";
import { ClienteResponse } from "../types/Cliente.type";
import { useClientesServices } from "./use-clientes-services";

export function useClientes() {
  const { clientesService } = useClientesServices();
  const { show } = useToast();

  const authenticate = useCallback(
    async (
      username: string,
      password: string,
    ): Promise<ClienteResponse | null> => {
      try {
        const response = await clientesService.authenticate(username, password);

        if (!response) {
          show({
            title: "Ops!",
            description: "Login ou senha incorretos.",
            type: "info",
          });

          return null;
        }

        show({
          title: "Sucesso!",
          description: "Login efetuado.",
          type: "success",
        });

        return response;
      } catch {
        show({
          title: "Erro!",
          description: "Ocorreu um erro ao efetuar login.",
          type: "error",
        });
      }
      return null;
    },
    [clientesService, show],
  );

  return {
    authenticate,
  };
}
