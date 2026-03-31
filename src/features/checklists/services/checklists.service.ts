import NetInfo from "@react-native-community/netinfo";
import { ChecklistsLocalRepository } from "../repositories/checklists-local.repository";
import { ChecklistsRepository } from "../repositories/checkslists.repository";
import { Checklist } from "../types/Checklist";

export class ChecklistsService {
  constructor(
    private checklistsRepository: ChecklistsRepository,
    private checklistsLocalRepository: ChecklistsLocalRepository,
  ) {}

  async obterListaChecklist(): Promise<Checklist[] | null> {
    const connection = await NetInfo.fetch();

    if (connection.isConnected) {
      try {
        return await this.checklistsRepository.obterListaChecklist();
      } catch {
        throw new Error("Erro ao obter lista de armazens.");
      }
    }

    return await this.checklistsLocalRepository.obterListaChecklist();
  }

  async obterChecklistPorArmazem(
    armazemId: number,
  ): Promise<Checklist[] | null> {
    const connection = await NetInfo.fetch();

    if (connection.isConnected) {
      try {
        return await this.checklistsRepository.obterChecklistPorArmazem(
          armazemId,
        );
      } catch {
        throw new Error("Erro ao obter checklist do armazem.");
      }
    }

    return await this.checklistsLocalRepository.obterChecklistPorArmazem(
      armazemId,
    );
  }
}
