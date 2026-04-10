import { queryClient } from "@/src/lib/react-query";

type QueryDataType = {
  id: number;
  nome: string;
};

type useNomeArmazemQueryDataProps = {
  armazemId: number;
  search?: string;
};

export function useNomeArmazemQueryData({
  armazemId,
  search,
}: useNomeArmazemQueryDataProps) {
  const armazens = queryClient.getQueryData<QueryDataType[]>([
    "armazens",
    search,
  ]);

  const nomeArmazem = armazens?.find(
    (armazem) => Number(armazem.id) === Number(armazemId),
  )?.nome;

  return {
    nomeArmazem,
  };
}
