import { ChecklistType } from "../../checklist/types/ChecklistType";

export type StorageType = {
  id: number;
  name: string;
  checklist: ChecklistType[];
};

export interface ICheckLinkStorageChecklistRequest {
  storageId: number;
  checklistId: number;
}

export interface ICheckLinkStorageChecklistResponse {
  id: number;
  storageId: number;
  checklistId: number;
}
