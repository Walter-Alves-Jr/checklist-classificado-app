import { api } from "@/src/lib/axios";
import { CheckListStorageRelationRequest } from "../../checklist/types/ChecklistStorageRelationType";
import { ChecklistType } from "../../checklist/types/ChecklistType";
import { QuestionChecklistType } from "../../perguntas/types/QuestionChecklistType";
import { QuestionType } from "../../perguntas/types/QuestionType";
import {
  ICheckLinkStorageChecklistRequest,
  ICheckLinkStorageChecklistResponse,
  StorageType,
} from "../types/StorageType";

export async function getStorages(): Promise<StorageType[]> {
  const { data } = await api.get<StorageType[]>("/armazens");
  return data;
}

export async function getChecklists(): Promise<ChecklistType[]> {
  const { data } = await api.get<ChecklistType[]>("/checklists");
  return data;
}

export const listarChecklistsPorArmazem = async (armazemId: number) => {
  const { data } = await api.get(`/checklists?armazemId=${armazemId}`);
  return data;
};

export async function getQuestionsByChecklist(
  checklistId: number,
): Promise<QuestionType[]> {
  const { data } = await api.get<QuestionType[]>(
    `/questions?checklistId=${checklistId}`,
  );
  return data;
}

export const getQuestionsByChecklistSelected = async (checklistId: number) => {
  const { data } = await api.get(`/questions?checklistId=${checklistId}`);
  return data;
};

export const listarPerguntas = async (armazemId: number) => {
  const { data } = await api.get(`/checklists?armazemId=${armazemId}`);
  return data;
};

export async function checkLinkStorageChecklist({
  storageId,
  checklistId,
}: ICheckLinkStorageChecklistRequest): Promise<
  ICheckLinkStorageChecklistResponse[]
> {
  const { data } = await api.get<ICheckLinkStorageChecklistResponse[]>(
    `/armazemChecklists?armazemId=${storageId}&checklistId=${checklistId}`,
  );
  return data;
}

export const checkQuestionChecklist = async (checklistId: number) => {
  const { data } = await api.get(`/questions?checklistId=${checklistId}`);
  return data;
};

export async function postQuestionChecklist(
  request: QuestionChecklistType,
): Promise<QuestionChecklistType> {
  const { data } = await api.post(`/questions`, request);

  return data;
}

export async function postChecklist(
  request: CheckListStorageRelationRequest,
): Promise<CheckListStorageRelationRequest> {
  const { data } = await api.post<CheckListStorageRelationRequest>(
    `/armazemChecklists`,
    {
      request,
    },
  );

  return data;
}

export async function getChecklistsByStorage(
  armazemId: number,
): Promise<ChecklistType[]> {
  const relation = await api.get(`/armazemChecklists?armazemId=${armazemId}`);

  const checklistIds = relation.data.map((r: any) => r.checklistId);

  const checklists = await Promise.all(
    checklistIds.map((id: number) =>
      api.get<ChecklistType[]>(`/checklists/${id}`),
    ),
  );

  return checklists.map((c) => c.data);
}
