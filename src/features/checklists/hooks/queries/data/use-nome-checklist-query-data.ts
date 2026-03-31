import { queryClient } from "@/src/lib/react-query";

type QueryDataType = {
  id: number;
  nome: string;
};

type UseStorageProps = {
  checklistId: number;
  armazemId?: number;
};

export function useNomeChecklistQueryData({
  checklistId,
  armazemId,
}: UseStorageProps) {
  const checklists = queryClient.getQueryData<QueryDataType[]>(["checklists"]);

  const checklistsByStorage = queryClient.getQueryData<QueryDataType[]>([
    "checklist_armazem",
    Number(armazemId),
  ]);

  const nomeChecklist = obterNome(checklists, checklistId);
  const nomeChecklistSelecionado = obterNome(checklistsByStorage, checklistId);

  return {
    nomeChecklist,
    nomeChecklistSelecionado,
  };
}

function obterNome(queryData: QueryDataType[] | undefined, id: number) {
  return queryData?.find((item) => Number(item.id) === Number(id))?.nome;
}
