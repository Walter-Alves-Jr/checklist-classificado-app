import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQuestionChecklist } from "../../armazens/services/armazemService";
import { QuestionChecklistType } from "../types/QuestionChecklistType";

export function useQuestion(questionId: number, newQuestion: string) {
  const queryClient = useQueryClient();

  const postQuestion = useMutation({
    mutationFn: async ({
      questions,
    }: {
      checklistId: number;
      questions: QuestionChecklistType[];
    }) => {
      await Promise.all(
        questions.map((question) => postQuestionChecklist(question)),
      );
    },

    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["questionsChecklist", Number(variables.checklistId)],
        (oldData: QuestionChecklistType[] | undefined) => {
          if (!oldData) return variables.questions;

          return [...oldData, ...variables.questions];
        },
      );
    },
  });

  const questionsQueryData = queryClient.getQueryData<QuestionChecklistType[]>([
    "questionsChecklist",
    Number(questionId),
  ]);

  const questionName = questionsQueryData?.find(
    (item) => item.question === newQuestion,
  )?.question;

  return {
    postQuestion,
    questionName,
  };
}
