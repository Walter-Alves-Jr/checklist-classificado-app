import { Checklist } from "../../checklists/types/Checklist";

export type StorageType = {
  id: number;
  name: string;
  checklist: Checklist[];
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
