import { queryClient } from "@/src/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { Pergunta } from "../../../types/Pergunta";
import { usePerguntas } from "../../use-perguntas";

export function usePerguntasMutation() {
  const { cadastrarPerguntas } = usePerguntas();

  return useMutation({
    mutationFn: async ({
      checklistId,
      perguntas,
    }: {
      checklistId: number;
      perguntas: Pergunta[];
    }) => {
      return await cadastrarPerguntas(checklistId, perguntas);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["perguntas_checklist", variables.checklistId],
        (old: Pergunta[] = []) => [...old, ...variables.perguntas],
      );
    },
  });
}
