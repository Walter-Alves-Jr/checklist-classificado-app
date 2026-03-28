import NetInfo from "@react-native-community/netinfo";
import { AgendamentosLocalRepository } from "../repositories/agendamentos/agendamentos-local-repository";
import { AgendamentosRepository } from "../repositories/agendamentos/agendamentos-repository";
import { AgendamentoResponse } from "../types/agendamento.type";

export class AgendamentoService {
  constructor(
    private agendamentosLocalRepository: AgendamentosLocalRepository,
    private agendamentosRepository: AgendamentosRepository,
  ) {}

  async getByNumeroAgendamento(
    numeroAgendamento: number,
  ): Promise<AgendamentoResponse | null> {
    const connection = await NetInfo.fetch();

    if (!numeroAgendamento || Number.isNaN(numeroAgendamento))
      throw new Error("Número do agendamento inválido.");

    if (connection.isConnected) {
      try {
        return await this.agendamentosRepository.getByNumeroAgendamento(
          numeroAgendamento,
        );
      } catch {
        throw new Error("Erro ao obter dados do agendamento informado.");
      }
    }

    return await this.agendamentosLocalRepository.getByNumeroAgendamentoLocal(
      numeroAgendamento,
    );
  }
}
