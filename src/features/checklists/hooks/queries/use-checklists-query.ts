import { useQuery } from "@tanstack/react-query";
import { useChecklists } from "../use-checklists";

export function useChecklistsQuery(search: string) {
  const { obterListaChecklist } = useChecklists(search);

  return useQuery({
    queryKey: ["checklists", search],
    enabled: true,
    queryFn: async () => {
      const data = await obterListaChecklist();

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    retry: false,
  });
}
