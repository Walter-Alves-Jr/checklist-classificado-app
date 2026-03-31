import { SQLiteDatabase } from "expo-sqlite";
import { Pergunta } from "../types/Pergunta";

export class PerguntasLocalRepository {
  constructor(private db: SQLiteDatabase) {}

  async obterListaPerguntas() {
    return await this.db.getAllAsync<Pergunta>(`SELECT * FROM perguntas`);
  }

  async obterPerguntasPorChecklist(checklistId: number) {
    return await this.db.getAllAsync<Pergunta>(
      `
      SELECT *
      FROM perguntas
      WHERE
        checklist_id = ?
    `,
      [checklistId],
    );
  }
}
