import { SQLiteDatabase } from "expo-sqlite";
import { Armazem } from "../types/Armazem";

export class ArmazensLocalRepository {
  constructor(private db: SQLiteDatabase) {}
  async obterListaArmazens(search: string) {
    return await this.db.getAllAsync<Armazem>(
      `
      SELECT *
      FROM armazens
      WHERE (? = '' OR LOWER(nome) LIKE LOWER(?))
      `,
      [search, `%${search}%`],
    );
  }
}
