import { SQLiteDatabase } from "expo-sqlite";
import { Armazem } from "../types/Armazem";

export class ArmazensLocalRepository {
  constructor(private db: SQLiteDatabase) {}

  async obterListaArmazens() {
    return await this.db.getAllAsync<Armazem>(`SELECT * FROM armazens`);
  }
}
