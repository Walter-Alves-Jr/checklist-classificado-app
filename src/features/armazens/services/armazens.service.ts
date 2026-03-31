import NetInfo from "@react-native-community/netinfo";
import { ArmazensLocalRepository } from "../repositories/armazens-local.repository";
import { ArmazensRepository } from "../repositories/armazens.repository";
import { Armazem } from "../types/Armazem";

export class ArmazemService {
  constructor(
    private armazensRepository: ArmazensRepository,
    private armazensLocalRepository: ArmazensLocalRepository,
  ) {}

  async obterListaArmazens(): Promise<Armazem[] | null> {
    const connection = await NetInfo.fetch();

    if (connection.isConnected) {
      try {
        return await this.armazensRepository.obterListaArmazens();
      } catch {
        throw new Error("Erro ao obter lista de armazens.");
      }
    }

    return await this.armazensLocalRepository.obterListaArmazens();
  }
}
