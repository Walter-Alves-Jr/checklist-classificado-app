import NetInfo from "@react-native-community/netinfo";
import { PerguntasLocalRepository } from "../repositories/perguntas-local.repository";
import { PerguntasRepository } from "../repositories/perguntas.repository";
import { Pergunta } from "../types/Pergunta";

export class PerguntasService {
  constructor(
    private perguntasRepository: PerguntasRepository,
    private perguntasLocalRepository: PerguntasLocalRepository,
  ) {}

  async obterListaPerguntas(): Promise<Pergunta[] | null> {
    const connection = await NetInfo.fetch();

    if (connection.isConnected) {
      try {
        return await this.perguntasRepository.obterListaPerguntas();
      } catch {
        throw new Error("Erro ao obter lista de perguntas.");
      }
    }

    return await this.perguntasLocalRepository.obterListaPerguntas();
  }

  async obterPerguntasPorChecklist(
    checklistId: number,
  ): Promise<Pergunta[] | null> {
    const connection = await NetInfo.fetch();

    if (connection.isConnected) {
      try {
        return await this.perguntasRepository.obterPerguntasPorChecklist(
          checklistId,
        );
      } catch {
        throw new Error("Erro ao obter perguntas do checklist.");
      }
    }

    return await this.perguntasLocalRepository.obterPerguntasPorChecklist(
      checklistId,
    );
  }
}
