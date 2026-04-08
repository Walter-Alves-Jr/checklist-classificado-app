import { useMutation } from "@tanstack/react-query";
import { salvarSessaoUsuarioStorage } from "../../../helpers/salvar-sessao-usuario-storage";
import { AuthResponse } from "../../../types/auth-response";
import { AuthRequest } from "../../../types/auth.request";
import { useAuth } from "../../use-auth";

export function useAuthMutation() {
  const { authenticate } = useAuth();

  return useMutation({
    mutationFn: async ({
      login,
      senha,
    }: AuthRequest): Promise<AuthResponse> => {
      const token = await authenticate(login, senha);
      return token;
    },

    onSuccess: async (response: AuthResponse) => {
      await salvarSessaoUsuarioStorage(response);
    },
  });
}
