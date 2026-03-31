import { useQuery } from "@tanstack/react-query";
import { useArmazens } from "../../use-armazens";

export function useArmazensQuery() {
  const { obterListaArmazens } = useArmazens();

  return useQuery({
    queryKey: ["armazens"],
    queryFn: async () => {
      const data = await obterListaArmazens();

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    retry: false,
  });
}
