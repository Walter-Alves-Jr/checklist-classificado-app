import { type SQLiteDatabase } from "expo-sqlite";
import { createTabelaClientes } from "./migrations/02042026_tabela_clientes";
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
  await db.execAsync(`
    DROP TABLE IF EXISTS armazem_checklists;
    DROP TABLE IF EXISTS armazens;
    DROP TABLE IF EXISTS checklist_execucoes;
    DROP TABLE IF EXISTS checklists;
    DROP TABLE IF EXISTS perguntas;
    DROP TABLE IF EXISTS cultura;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS respostas;
    DROP TABLE IF EXISTS tabela_agendamentos;
    DROP TABLE IF EXISTS tabela_cultura;
    DROP TABLE IF EXISTS tabela_graos;
  `);

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
    await createTabelaClientes(db);
  });

  await db.execAsync(`
    INSERT OR IGNORE INTO armazens (nome)
    VALUES
    ("Armazém São Paulo"),
    ("Armazém Rio de Janeiro"),
    ("Armazém Bahia");

    INSERT OR IGNORE INTO checklists (nome)
    VALUES
    ("Checklist Segurança"),
    ("Checklist Estrutura"),
    ("Checklist Caminhão");

    INSERT OR IGNORE INTO armazem_checklists (armazem_id, checklist_id)
    VALUES 
    (1,1),
    (1,2),
    (2,2),
    (2,3),
    (3,1),
    (3,3);

    INSERT OR IGNORE INTO tabela_agendamentos 
    (numeroAgendamento, placaVeiculo, motorista, transportadora, produto, terminal)
    VALUES
    (2026001, "ABC-2D33", "Mai Valentine", "SEDEX", "Fubá", "CMD"),
    (2026002, "CBA-1L47", "Isis Ishtar", "JADLOG", "Macarrão", "MDC"),
    (2026003, "BCA-9K98", "Weevil Underwood", "TRANSTURISMO", "Óleo", "CDM");

    INSERT OR IGNORE INTO perguntas
    (checklist_id, pergunta, requires_photo, response_type)
    VALUES
    (1, "Pergunta 1", 0, "multiple"),
    (1, "Pergunta 2", 0, "multiple"),
    (2, "Pergunta 3", 0, "text"),
    (2, "Pergunta 4", 0, "text"),
    (3, "Pergunta 5", 1, "number"),
    (3, "Pergunta 6", 1, "number");

    INSERT OR IGNORE INTO clientes (
      username,
      password,
      nome,
      logo,
      background_primary,
      text_color
    ) VALUES 
    (
      'green',
      'green',
      'Green',
      '',
      '#22c55e',
      '#e5e7eb'
    ),
    (
      'blue',
      'blue',
      'Blue',
      '',
      '#2291c5',
      '#e5e7eb'
    ),
    (
      'admin',
      'admin',
      'Admin',
      '',
      '#ff3e04',
      '#e5e7eb'
    );
  `);

  alert("Tabelas criadas com sucesso.");
}
