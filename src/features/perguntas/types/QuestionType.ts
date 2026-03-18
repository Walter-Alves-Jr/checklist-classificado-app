import { StorageType } from "../../armazens/types/StorageType";

export type QuestionType = {
  id: number;
  checklist: string;
  question: string;
  responseType: string;
  photo: boolean;
  storage: StorageType;
};
