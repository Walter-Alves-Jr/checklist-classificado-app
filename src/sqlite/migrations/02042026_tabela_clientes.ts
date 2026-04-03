import { type SQLiteDatabase } from "expo-sqlite";

export async function createTabelaClientes(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      nome TEXT NOT NULL,
      logo TEXT,

      background_primary TEXT,
      text_color TEXT
    );
  `);
}
