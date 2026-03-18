import { useQuery } from "@tanstack/react-query";
import { getQuestionsByChecklist } from "../../../armazens/services/armazemService";

type UseStorageProps = {
  checklistId: number;
};

export function useQuestionsChecklist({ checklistId }: UseStorageProps) {
  const questionsChecklist = useQuery({
    queryKey: ["questionsChecklist", checklistId],
    queryFn: () => getQuestionsByChecklist(checklistId!),
    enabled: !!checklistId,
  });

  return {
    ...questionsChecklist,
  };
}
