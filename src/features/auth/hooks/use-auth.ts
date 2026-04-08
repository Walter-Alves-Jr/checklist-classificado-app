import { useToast } from "@/src/shared/components/Toast";
import { useCallback } from "react";
import { AuthResponse } from "../types/auth-response";
import { useAuthService } from "./use-auth-service";

export function useAuth() {
  const { authService } = useAuthService();
  const { show } = useToast();

  const authenticate = useCallback(
    async (login: string, senha: string): Promise<AuthResponse> => {
      try {
        const response = await authService.authenticate(login, senha);

        if (!response?.token) {
          show({
            title: "Ops!",
            description: "Login ou senha incorretos.",
            type: "info",
          });
        }

        show({
          title: "Sucesso!",
          description: "Login efetuado.",
          type: "success",
        });

        return response;
      } catch {
        show({
          title: "Ops!",
          description: "Login ou senha incorretos.",
          type: "info",
        });

        throw Error;
      }
    },
    [authService, show],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      show({
        title: "Erro!",
        description: "Ocorreu um erro ao deslogar.",
        type: "error",
      });

      throw Error;
    }
  }, [authService, show]);

  return {
    authenticate,
    logout,
  };
}
