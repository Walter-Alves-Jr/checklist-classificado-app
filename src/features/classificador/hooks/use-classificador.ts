import { useToast } from "@/src/shared/components/Toast";
import { useCallback } from "react";
import { AgendamentoResponse } from "../types/agendamento.type";
import { useClassificadorServices } from "./use-classificador-services";

export function useClassificador() {
  const { agendamentoService } = useClassificadorServices();
  const { show } = useToast();

  const obterAgendamentoPorNumero = useCallback(
    async (numeroAgendamento: number): Promise<AgendamentoResponse | null> => {
      try {
        const response =
          await agendamentoService.getByNumeroAgendamento(numeroAgendamento);

        if (!response) {
          show({
            title: "Ops!",
            description: "Agendamento não encontrado.",
            type: "info",
          });

          return null;
        }

        show({
          title: "Sucesso!",
          description: "Dados carregados.",
          type: "success",
        });

        return response;
      } catch {
        show({
          title: "Erro!",
          description: "Ocorreu um erro ao buscar o agendamento informado.",
          type: "error",
        });
      }
      return null;
    },
    [agendamentoService, show],
  );

  return {
    obterAgendamentoPorNumero,
  };
}
