import { queryClient } from "@/src/lib/react-query";

type QueryDataType = {
  id: number;
  name: string;
};

type UseStorageProps = {
  armazemId: number;
};

export function useGetStorageNameQueryData({ armazemId }: UseStorageProps) {
  const storagesData = queryClient.getQueryData<QueryDataType[]>(["storages"]);

  const storageName = storagesData?.find(
    (storage) => Number(storage.id) === Number(armazemId),
  )?.name;

  return {
    storageName,
  };
}
