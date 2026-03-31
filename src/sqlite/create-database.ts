import { type SQLiteDatabase } from "expo-sqlite";
import { createTabelaAgendamentos } from "./migrations/27_03_2026_tabela_agendamentos";
import { createTabelaCultura } from "./migrations/27_03_2026_tabela_cultura";
import { createTabelaGraos } from "./migrations/27_03_2026_tabela_graos";
import {
  createTabelaArmazemChecklists,
  createTabelaArmazens,
  createTabelaChecklistExecucoes,
  createTabelaChecklists,
  createTabelaPerguntas,
  createTabelaRespostas,
} from "./migrations/31032026_create_checklist_module";
import { createIndexArmazemChecklists } from "./migrations/31032026_create_index_armazem_checklists";

export async function runMigrations(db: SQLiteDatabase) {
  await db.withTransactionAsync(async () => {
    await createTabelaCultura(db);
    await createTabelaAgendamentos(db);
    await createTabelaGraos(db);
    await createTabelaArmazens(db);
    await createTabelaChecklists(db);
    await createTabelaPerguntas(db);
    await createTabelaArmazemChecklists(db);
    await createTabelaChecklistExecucoes(db);
    await createTabelaRespostas(db);
    await createIndexArmazemChecklists(db);
  });
}
