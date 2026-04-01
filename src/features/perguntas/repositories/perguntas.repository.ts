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

  async cadastrarPerguntas(
    checklistId: number,
    perguntas: Pergunta[],
  ): Promise<boolean> {
    await api.post<Pergunta[]>(`/perguntas`, {
      checklistId,
      perguntas,
    });
    // todo: refatorar função
    return true;
  }

  async perguntaExisteNoChecklist(
    checklistId: number,
    pergunta: string,
  ): Promise<boolean> {
    const { data } = await api.get<Pergunta[]>(
      `/perguntas?checklist_id=${checklistId}`,
    );

    return data.some(
      (item) =>
        item.pergunta.toLowerCase().trim() === pergunta.toLowerCase().trim(),
    );
  }
}
