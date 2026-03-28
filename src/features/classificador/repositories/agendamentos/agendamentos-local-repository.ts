import { SQLiteDatabase } from "expo-sqlite";
import { AgendamentoResponse } from "../../types/agendamento.type";

export class AgendamentosLocalRepository {
  constructor(private db: SQLiteDatabase) {}

  async getByNumeroAgendamentoLocal(numeroAgendamento: number) {
    return await this.db.getFirstAsync<AgendamentoResponse>(
      `SELECT * FROM tabela_agendamentos WHERE numeroAgendamento = ?`,
      numeroAgendamento,
    );
  }
}
