import { SQLiteDatabase } from "expo-sqlite";
import { Checklist } from "../types/Checklist";

export class ChecklistsLocalRepository {
  constructor(private db: SQLiteDatabase) {}

  async obterListaChecklist(search: string) {
    return await this.db.getAllAsync<Checklist>(
      `
      SELECT *
      FROM checklists
      WHERE (? = '' OR LOWER(nome) LIKE LOWER(?))
      `,
      [search, `%${search}%`],
    );
  }

  async obterChecklistPorArmazem(armazemId: number) {
    return await this.db.getAllAsync<Checklist>(
      `
    SELECT c.*
    FROM checklists c
    JOIN armazem_checklists ac ON ac.checklist_id = c.id
    WHERE ac.armazem_id = ?
    `,
      [armazemId],
    );
  }
}
