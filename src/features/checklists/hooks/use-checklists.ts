import { useToast } from "@/src/shared/components/Toast";
import { useCallback } from "react";
import { Checklist } from "../types/Checklist";
import { useChecklistsServices } from "./use-checklists-services";

export function useChecklists() {
  const { checklistsService } = useChecklistsServices();
  const { show } = useToast();

  const obterListaChecklist = useCallback(async (): Promise<
    Checklist[] | null
  > => {
    try {
      const response = await checklistsService.obterListaChecklist();

      if (!response) {
        show({
          title: "Ops!",
          description: "Nenhum checklist cadastrado.",
          type: "info",
        });

        return null;
      }

      return response;
    } catch {
      show({
        title: "Erro!",
        description: "Ocorreu um erro ao listar checklists.",
        type: "error",
      });
    }
    return null;
  }, [checklistsService, show]);

  const obterChecklistPorArmazem = useCallback(
    async (armazemId: number): Promise<Checklist[] | null> => {
      try {
        const response =
          await checklistsService.obterChecklistPorArmazem(armazemId);

        if (!response) {
          show({
            title: "Ops!",
            description: "Nenhum checklist cadastrado no armazem.",
            type: "info",
          });

          return null;
        }

        return response;
      } catch {
        show({
          title: "Erro!",
          description: "Ocorreu um erro ao obter checklist do armazem.",
          type: "error",
        });
      }
      return null;
    },
    [checklistsService, show],
  );

  return {
    obterListaChecklist,
    obterChecklistPorArmazem,
  };
}
