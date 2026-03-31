import { useQuery } from "@tanstack/react-query";
import { usePerguntas } from "../../use-perguntas";

export function usePerguntasChecklistQuery(checklistId: number) {
  const { obterPerguntasPorChecklist } = usePerguntas();

  return useQuery({
    queryKey: ["perguntas_checklist", checklistId],
    queryFn: async () => {
      const data = await obterPerguntasPorChecklist(checklistId);

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    retry: false,
    enabled: !!checklistId,
  });
}
