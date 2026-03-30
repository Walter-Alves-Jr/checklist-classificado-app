import { type SQLiteDatabase } from "expo-sqlite";

export async function createTabelaAgendamentos(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tabela_agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numeroAgendamento INTEGER NOT NULL UNIQUE,
      placaVeiculo TEXT NOT NULL,
      motorista TEXT NOT NULL,
      transportadora TEXT NOT NULL,
      produto TEXT NOT NULL,
      terminal TEXT NOT NULL
    );
  `);
}
