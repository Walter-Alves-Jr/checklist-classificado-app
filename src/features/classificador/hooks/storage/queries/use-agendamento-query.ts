import { useQuery } from "@tanstack/react-query";
import { useClassificador } from "../../use-classificador";

export function useAgendamentoQuery(numero: number) {
  const { obterAgendamentoPorNumero } = useClassificador();

  return useQuery({
    queryKey: ["agendamento", numero],
    queryFn: async () => {
      const data = await obterAgendamentoPorNumero(numero);

      if (!data) throw new Error("INVALID_DATA");

      return data;
    },
    enabled: !!numero && String(numero).length > 5,
    retry: false,
  });
}
