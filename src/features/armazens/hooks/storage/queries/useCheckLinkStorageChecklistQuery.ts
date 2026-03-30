import { checkLinkStorageChecklist } from "@/src/features/armazens/services/armazemService";
import { useQuery } from "@tanstack/react-query";

type CheckLinkProps = {
  storageId?: number;
  checklistId?: number;
};

export function useCheckLinkStorageChecklistQuery({
  storageId,
  checklistId,
}: CheckLinkProps) {
  const isEnabled = storageId != null && checklistId != null;

  return useQuery({
    queryKey: ["checkLinkStorageChecklist", { checklistId, storageId }],
    queryFn: () =>
      checkLinkStorageChecklist({
        storageId: storageId as number,
        checklistId: checklistId as number,
      }),
    enabled: isEnabled,
  });
}
