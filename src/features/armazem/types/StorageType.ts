import { Checklist } from "../../checklist/types/ChecklistType";

export type StorageType = {
  id: number;
  name: string;
  checklist: Checklist[];
};
