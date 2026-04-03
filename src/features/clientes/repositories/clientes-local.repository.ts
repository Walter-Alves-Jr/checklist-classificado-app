import { SQLiteDatabase } from "expo-sqlite";
import { ClienteResponse } from "../types/Cliente.type";

export class ClientesLocalRepository {
  constructor(private db: SQLiteDatabase) {}

  async authenticate(username: string, password: string) {
    const cliente = await this.db.getFirstAsync<ClienteResponse | null>(
      `SELECT 
        id, 
        nome, 
        logo,
        background_primary,
        text_color 
      FROM clientes 
      WHERE 
        username = ? AND 
      password = ?`,
      [username, password],
    );

    return cliente ?? null;
  }
}
