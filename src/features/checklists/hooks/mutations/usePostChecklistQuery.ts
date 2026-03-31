import { useMutation } from "@tanstack/react-query";
import { postChecklist } from "../../../armazens/services/armazemService";
import { CheckListStorageRelationRequest } from "../../types/ChecklistStorageRelationType";

export function usePostChecklistQuery() {
  return useMutation({
    mutationFn: async ({
      checklistId,
      armazemId,
    }: CheckListStorageRelationRequest) => {
      const dados = await postChecklist({ checklistId, armazemId });
      return dados;
    },

    onSuccess: (dados) => {},
  });
}
