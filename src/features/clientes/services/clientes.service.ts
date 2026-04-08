import NetInfo from "@react-native-community/netinfo";
import { ClientesLocalRepository } from "../repositories/clientes-local.repository";
import { ClientesRepository } from "../repositories/clientes.repository";
import { ClienteResponse } from "../types/Cliente.type";

export class ClientesService {
  constructor(
    private clientesLocalRepository: ClientesLocalRepository,
    private clientesRepository: ClientesRepository,
  ) {}

  async authenticate(
    username: string,
    password: string,
  ): Promise<ClienteResponse | null> {
    const connection = await NetInfo.fetch();

    if (!username?.trim() || !password?.trim()) {
      throw new Error("Informe login e senha");
    }

    if (connection.isConnected) {
      try {
        return await this.clientesRepository.authenticate(username, password);
      } catch {
        throw new Error("Ocorreu um erro ao efetuar login.");
      }
    }

    const cliente = await this.clientesLocalRepository.authenticate(
      username,
      password,
    );

    if (!cliente) return null;

    return cliente;
  }
}
