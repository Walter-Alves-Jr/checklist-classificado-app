import { api } from "@/src/lib/axios/axios";
import { Checklist } from "../types/Checklist";

export class ChecklistsRepository {
  async obterListaChecklist(): Promise<Checklist[] | null> {
    const { data } = await api.get<Checklist[]>(`/checklists`);

    return data ?? null;
  }

  async obterChecklistPorArmazem(
    armazemId: number,
  ): Promise<Checklist[] | null> {
    const { data } = await api.get<Checklist[]>(
      `/checklists?armazemId=${armazemId}`,
    );

    return data ?? null;
  }
}
