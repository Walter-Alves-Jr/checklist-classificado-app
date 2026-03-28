import { type SQLiteDatabase } from "expo-sqlite";
import { createTabelaAgendamentos } from "./migrations/27_03_2026_tabela_agendamentos";
import { createTabelaCultura } from "./migrations/27_03_2026_tabela_cultura";
import { createTabelaGraos } from "./migrations/27_03_2026_tabela_graos";

export async function runMigrations(db: SQLiteDatabase) {
  await db.withTransactionAsync(async () => {
    await createTabelaCultura(db);
    await createTabelaAgendamentos(db);
    await createTabelaGraos(db);
  });
}
