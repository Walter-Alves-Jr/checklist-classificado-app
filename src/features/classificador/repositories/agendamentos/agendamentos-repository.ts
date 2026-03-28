import { api } from "@/src/lib/axios/axios";
import { AgendamentoResponse } from "../../types/agendamento.type";

export class AgendamentosRepository {
  async getByNumeroAgendamento(
    numeroAgendamento: number,
  ): Promise<AgendamentoResponse | null> {
    const { data } = await api.get<AgendamentoResponse[]>(
      `/agendamentos?numeroAgendamento=${numeroAgendamento}`,
    );

    return data.length > 0 ? data[0] : null;
  }
}
