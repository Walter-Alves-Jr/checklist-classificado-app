import { SQLiteDatabase } from "expo-sqlite";
import { Checklist } from "../types/Checklist";

export class ChecklistsLocalRepository {
  constructor(private db: SQLiteDatabase) {}

  async obterListaChecklist() {
    return await this.db.getAllAsync<Checklist>(`SELECT * FROM checklists`);
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
