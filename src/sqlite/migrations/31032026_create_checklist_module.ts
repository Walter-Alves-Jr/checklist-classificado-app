import { type SQLiteDatabase } from "expo-sqlite";

export async function createTabelaArmazens(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS armazens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );
  `);
}

export async function createTabelaChecklists(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS checklists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );
  `);
}

export async function createTabelaPerguntas(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS perguntas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checklist_id INTEGER NOT NULL,
      pergunta TEXT NOT NULL,
      requires_photo INTEGER DEFAULT 0,
      response_type TEXT NOT NULL,

      FOREIGN KEY (checklist_id) REFERENCES checklists(id)
    );
  `);
}

export async function createTabelaArmazemChecklists(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS armazem_checklists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      armazem_id INTEGER NOT NULL,
      checklist_id INTEGER NOT NULL,

      FOREIGN KEY (armazem_id) REFERENCES armazens(id),
      FOREIGN KEY (checklist_id) REFERENCES checklists(id),

      UNIQUE(armazem_id, checklist_id)
    );
  `);
}

export async function createTabelaChecklistExecucoes(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS checklist_execucoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checklist_id INTEGER NOT NULL,
      armazem_id INTEGER NOT NULL,

      data TEXT NOT NULL,
      gps TEXT,

      FOREIGN KEY (checklist_id) REFERENCES checklists(id),
      FOREIGN KEY (armazem_id) REFERENCES armazens(id)
    );
  `);
}

export async function createTabelaRespostas(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS respostas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      execucao_id INTEGER NOT NULL,
      pergunta_id INTEGER NOT NULL,
      resposta TEXT,

      FOREIGN KEY (execucao_id) REFERENCES checklist_execucoes(id),
      FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
    );
  `);
}
