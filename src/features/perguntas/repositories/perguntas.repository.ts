import { api } from "@/src/lib/axios/axios";
import { Pergunta } from "../types/Pergunta";

export class PerguntasRepository {
  async obterListaPerguntas(): Promise<Pergunta[] | null> {
    const { data } = await api.get<Pergunta[]>(`/perguntas`);

    return data ?? null;
  }

  async obterPerguntasPorChecklist(
    checklistId: number,
  ): Promise<Pergunta[] | null> {
    const { data } = await api.get<Pergunta[]>(
      `/perguntas?checklistId=${checklistId}`,
    );

    return data ?? null;
  }
}
