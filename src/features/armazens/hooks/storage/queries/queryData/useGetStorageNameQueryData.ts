import { queryClient } from "@/src/lib/react-query";

type QueryDataType = {
  id: number;
  nome: string;
};

type UseStorageProps = {
  armazemId: number;
};

export function useGetStorageNameQueryData({ armazemId }: UseStorageProps) {
  const storagesData = queryClient.getQueryData<QueryDataType[]>(["armazens"]);

  const storageName = storagesData?.find(
    (storage) => Number(storage.id) === Number(armazemId),
  )?.nome;

  return {
    storageName,
  };
}
