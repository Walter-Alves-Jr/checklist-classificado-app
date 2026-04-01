import { useMutation } from "@tanstack/react-query";
import { generateChecklistPDF } from "../../services/checklists-execucao.service";
import { ChecklistExecuteType } from "../../types/ChecklistExecuteType";

export function useChecklistResponse() {
  return useMutation({
    mutationFn: async (dados: ChecklistExecuteType) => {
      // await registerChecklistResponseLocalStorage(dados);
      // await registerChecklistResponse(dados);

      return dados;
    },

    onSuccess: (dados) => {
      // 🔥 gerar PDF após sucesso
      generateChecklistPDF(dados);
    },
  });
}
