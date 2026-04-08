import { api } from "@/src/lib/axios/axios";
import { removerSessaoUsuarioStorage } from "../helpers/remover-sessao-usuario-storage";
import { AuthResponse } from "../types/auth-response";

export class AuthRepository {
  async authenticate(login: string, senha: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      `https://api-teste.yms.trizy.com.br/api/v1/authenticate`,
      {
        login,
        senha,
      },
    );

    return data;
  }

  async logout() {
    await removerSessaoUsuarioStorage();
  }
}
