import { api } from "@/src/lib/axios/axios";
import { ClienteResponse } from "../types/Cliente.type";

export class ClientesRepository {
  async authenticate(
    login: string,
    senha: string,
  ): Promise<ClienteResponse | null> {
    const { data } = await api.post<ClienteResponse[]>(`/authenticate`, {
      login,
      senha,
    });

    return data.length > 0 ? data[0] : null;
  }
}
