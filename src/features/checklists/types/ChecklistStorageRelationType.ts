export type CheckListStorageRelationType = {
  id: number;
  checklistId: number;
  armazemId: number;
};

export interface CheckListStorageRelationRequest {
  checklistId: number;
  armazemId: number;
}
