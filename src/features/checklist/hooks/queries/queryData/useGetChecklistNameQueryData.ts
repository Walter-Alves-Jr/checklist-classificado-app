import { queryClient } from "@/src/lib/react-query";

type QueryDataType = {
  id: number;
  name: string;
};

type UseStorageProps = {
  checklistId: number;
  storageId?: number;
};

export function useGetChecklistNameQueryData({
  checklistId,
  storageId,
}: UseStorageProps) {
  const checklists = queryClient.getQueryData<QueryDataType[]>(["checklists"]);

  const checklistsByStorage = queryClient.getQueryData<QueryDataType[]>([
    "checklistsByStorage",
    Number(storageId),
  ]);

  const checklistName = getName(checklists, checklistId);
  const checklistNameByStorage = getName(checklistsByStorage, checklistId);

  return {
    checklistName,
    checklistNameByStorage,
  };
}

function getName(queryData: QueryDataType[] | undefined, id: number) {
  return queryData?.find((item) => Number(item.id) === Number(id))?.name;
}
