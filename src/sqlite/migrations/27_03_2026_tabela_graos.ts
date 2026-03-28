import { type SQLiteDatabase } from "expo-sqlite";

export async function createTabelaGraos(db: SQLiteDatabase) {
  await db.execAsync(`
     CREATE TABLE IF NOT EXISTS tabela_graos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cultura_id INTEGER NOT NULL,
      umidade REAL NOT NULL,
      impureza REAL NOT NULL,
      ardidos REAL,
      mofados REAL,
      germinados REAL,
      quebrados REAL,
      pesoHectolitro REAL,
      FOREIGN KEY (cultura_id) REFERENCES tabela_cultura(id)
    );
  `);
}
