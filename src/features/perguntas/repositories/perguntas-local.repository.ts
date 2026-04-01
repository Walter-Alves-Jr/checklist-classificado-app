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

  async cadastrarPerguntas(
    checklistId: number,
    perguntas: Pergunta[],
  ): Promise<boolean> {
    await this.db.execAsync("BEGIN TRANSACTION");

    try {
      for (const item of perguntas) {
        await this.db.runAsync(
          `
        INSERT INTO perguntas (
          checklist_id,
          pergunta,
          requires_photo,
          response_type
        )
        VALUES (?, ?, ?, ?)
        `,
          [
            checklistId,
            item.pergunta,
            item.requires_photo ? 1 : 0,
            item.response_type,
          ],
        );
      }

      await this.db.execAsync("COMMIT");
      return true;
    } catch {
      await this.db.execAsync("ROLLBACK");
      return false;
    }
  }

  async perguntaExisteNoChecklist(checklistId: number, pergunta: string) {
    const result = await this.db.getFirstAsync(
      `
    SELECT 1
    FROM 
      perguntas
    WHERE 
      checklist_id = ?
      AND pergunta = ? COLLATE NOCASE
    `,
      [checklistId, pergunta],
    );

    return !!result;
  }
}
