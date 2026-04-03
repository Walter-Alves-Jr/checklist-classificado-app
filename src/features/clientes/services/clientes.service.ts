import { ClientesLocalRepository } from "../repositories/clientes-local.repository";
import { ClienteResponse } from "../types/Cliente.type";

export class ClientesService {
  constructor(private clientesLocalRepository: ClientesLocalRepository) {}

  async authenticate(
    username: string,
    password: string,
  ): Promise<ClienteResponse | null> {
    if (!username?.trim() || !password?.trim()) {
      throw new Error("Informe login e senha");
    }

    const cliente = await this.clientesLocalRepository.authenticate(
      username,
      password,
    );

    if (!cliente) return null;

    return cliente;
  }
}
