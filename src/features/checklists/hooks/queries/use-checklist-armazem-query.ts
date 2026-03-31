import { useQuery } from "@tanstack/react-query";
import { useChecklists } from "../use-checklists";

export function useChecklistArmazemQuery(armazemId: number) {
  const { obterChecklistPorArmazem } = useChecklists();

  return useQuery({
    queryKey: ["checklist_armazem", armazemId],
    queryFn: async () => {
      const data = await obterChecklistPorArmazem(armazemId);

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    retry: false,
    enabled: !!armazemId,
  });
}
