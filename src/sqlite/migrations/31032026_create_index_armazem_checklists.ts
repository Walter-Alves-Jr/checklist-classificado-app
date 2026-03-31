import { type SQLiteDatabase } from "expo-sqlite";

export async function createIndexArmazemChecklists(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_armazem_checklists_armazem
    ON armazem_checklists(armazem_id);
  `);
}
