import { useQuery } from "@tanstack/react-query";
import { useArmazens } from "../../use-armazens";

export function useArmazensQuery(search: string) {
  const { obterListaArmazens } = useArmazens(search);

  return useQuery({
    queryKey: ["armazens", search],
    enabled: true,
    queryFn: async () => {
      const data = await obterListaArmazens();

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    retry: false,
  });
}
