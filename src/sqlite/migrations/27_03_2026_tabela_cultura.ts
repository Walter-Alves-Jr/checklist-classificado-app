import { type SQLiteDatabase } from "expo-sqlite";

export async function createTabelaCultura(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tabela_cultura (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL UNIQUE
    );
  `);
}
