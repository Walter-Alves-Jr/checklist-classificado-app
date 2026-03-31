import { useQuery } from "@tanstack/react-query";
import { useChecklists } from "../use-checklists";

export function useChecklistsQuery() {
  const { obterListaChecklist } = useChecklists();

  return useQuery({
    queryKey: ["checklists"],
    queryFn: async () => {
      const data = await obterListaChecklist();

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    retry: false,
  });
}
