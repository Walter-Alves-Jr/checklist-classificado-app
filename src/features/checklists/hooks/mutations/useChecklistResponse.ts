import { registerChecklistResponseLocalStorage } from "@/src/localStorage/services/localStorageService";
import { useMutation } from "@tanstack/react-query";
import {
  generateChecklistPDF,
  registerChecklistResponse,
} from "../../../armazens/services/checklistService";
import { ChecklistExecuteType } from "../../types/ChecklistExecuteType";

export function useChecklistResponse() {
  return useMutation({
    mutationFn: async (dados: ChecklistExecuteType) => {
      await registerChecklistResponseLocalStorage(dados);
      await registerChecklistResponse(dados);

      return dados;
    },

    onSuccess: (dados) => {
      // 🔥 gerar PDF após sucesso
      generateChecklistPDF(dados);
    },
  });
}
