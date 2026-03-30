import { useQuery } from "@tanstack/react-query";
import { getChecklists } from "../../../armazens/services/armazemService";

export function useChecklist() {
  const checklists = useQuery({
    queryKey: ["checklists"],
    queryFn: getChecklists,
  });

  return {
    ...checklists,
  };
}
