import { useToast } from "@/src/shared/components/Toast";
import { useCallback } from "react";
import { Pergunta } from "../types/Pergunta";
import { usePerguntasServices } from "./use-perguntas-services";

export function usePerguntas() {
  const { perguntasService } = usePerguntasServices();
  const { show } = useToast();

  const obterListaPerguntas = useCallback(async (): Promise<
    Pergunta[] | null
  > => {
    try {
      const response = await perguntasService.obterListaPerguntas();

      if (!response) {
        show({
          title: "Ops!",
          description: "Nenhuma pergunta cadastrada.",
          type: "info",
        });

        return null;
      }

      return response;
    } catch {
      show({
        title: "Erro!",
        description: "Ocorreu um erro ao listar perguntas.",
        type: "error",
      });
    }
    return null;
  }, [perguntasService, show]);

  const obterPerguntasPorChecklist = useCallback(
    async (checklistId: number): Promise<Pergunta[] | null> => {
      try {
        const response =
          await perguntasService.obterPerguntasPorChecklist(checklistId);

        if (!response) {
          show({
            title: "Ops!",
            description: "Nenhuma pergunta cadastrada no checklist.",
            type: "info",
          });

          return null;
        }

        return response;
      } catch {
        show({
          title: "Erro!",
          description: "Ocorreu um erro ao obter perguntas do checklist.",
          type: "error",
        });
      }
      return null;
    },
    [perguntasService, show],
  );

  const cadastrarPerguntas = useCallback(
    async (checklistId: number, perguntas: Pergunta[]): Promise<boolean> => {
      try {
        const response = await perguntasService.cadastrarPerguntas(
          checklistId,
          perguntas,
        );

        if (!response) {
          show({
            title: "Ops!",
            description: "Nenhuma pergunta cadastrada no checklist.",
            type: "info",
          });

          return false;
        }

        return response;
      } catch {
        show({
          title: "Erro!",
          description: "Ocorreu um erro ao obter perguntas do checklist.",
          type: "error",
        });
      }
      return false;
    },
    [perguntasService, show],
  );

  const perguntaExisteNoChecklist = useCallback(
    async (checklistId: number, pergunta: string): Promise<boolean> => {
      try {
        const response = await perguntasService.perguntaExisteNoChecklist(
          checklistId,
          pergunta,
        );

        if (response) {
          show({
            title: "Ops!",
            description: "Pergunta já existe no checklist.",
            type: "warning",
          });

          return response;
        }

        return response;
      } catch {
        show({
          title: "Erro!",
          description: "Ocorreu um erro ao validar perguntas existentes.",
          type: "error",
        });
      }
      return false;
    },
    [perguntasService, show],
  );

  return {
    obterListaPerguntas,
    obterPerguntasPorChecklist,
    cadastrarPerguntas,
    perguntaExisteNoChecklist,
  };
}
