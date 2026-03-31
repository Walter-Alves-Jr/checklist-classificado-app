import { api } from "@/src/lib/axios/axios";
import { Armazem } from "../types/Armazem";

export class ArmazensRepository {
  async obterListaArmazens(): Promise<Armazem[] | null> {
    const { data } = await api.get<Armazem[]>(`/armazens`);

    return data ?? null;
  }
}
