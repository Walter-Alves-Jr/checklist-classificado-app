import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { getChecklistsByStorage } from "../../../armazens/services/armazemService";

export function useChecklistByStorage(storageId?: number) {
  const checklists = useQuery({
    queryKey: ["checklistsByStorage", storageId],
    queryFn: () => getChecklistsByStorage(storageId!),
    enabled: !!storageId, // só executa se tiver id
  });

  function selectedCheckList(checklistId: number) {
    if (!storageId) return;
    router.push({
      pathname: "/armazens/[armazemId]/checklist/[checklistId]",
      params: {
        armazemId: storageId.toString(),
        checklistId: checklistId.toString(),
      },
    });
  }

  return {
    ...checklists,
    selectedCheckList,
  };
}
