import { ChecklistQuestionType } from "./ChecklistQuestionType";

export type ChecklistType = {
  id: number;
  name: string;
  questions: ChecklistQuestionType[];
  storageId?: number;
};
