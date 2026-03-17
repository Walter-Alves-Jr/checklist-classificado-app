import { apiClient } from "@/src/shared/api/apiClient";
import { QuestionChecklistType } from "../../questions/types/QuestionChecklistType";

export const listarArmazens = async () => {
  const { data } = await apiClient.get("/armazens");
  return data;
};

export const listarChecklists = async () => {
  const { data } = await apiClient.get("/checklists");
  return data;
};

export const listarChecklistsPorArmazem = async (armazemId: number) => {
  const { data } = await apiClient.get(`/checklists?armazemId=${armazemId}`);
  return data;
};

export const getQuestionsByChecklist = async (checklistId: number) => {
  const { data } = await apiClient.get(`/questions?checklistId=${checklistId}`);
  return data;
};

export const listarPerguntasChecklist = async (checklistId: number) => {
  const { data } = await apiClient.get(`/questions?checklistId=${checklistId}`);
  return data;
};

export const listarPerguntas = async (armazemId: number) => {
  const { data } = await apiClient.get(`/checklists?armazemId=${armazemId}`);
  return data;
};

export const checkLinkStorageChecklist = async (
  storageId: number,
  checklistId: number,
) => {
  const { data } = await apiClient.get(
    `/armazemChecklists?armazemId=${storageId}&checklistId=${checklistId}`,
  );
  return data;
};

export const checkQuestionChecklist = async (checklistId: number) => {
  const { data } = await apiClient.get(`/questions?checklistId=${checklistId}`);
  return data;
};

export const postQuestionChecklist = async (request: QuestionChecklistType) => {
  const { data } = await apiClient.post(`/questions`, request);

  return data;
};

export const postChecklist = async (storageId: number, checklistId: number) => {
  const { data } = await apiClient.post(`/armazemChecklists`, {
    storageId,
    checklistId,
  });

  return data;
};

export async function getChecklistsByStorage(armazemId: number) {
  const relation = await apiClient.get(
    `/armazemChecklists?armazemId=${armazemId}`,
  );

  const checklistIds = relation.data.map((r: any) => r.checklistId);

  const checklists = await Promise.all(
    checklistIds.map((id: number) => apiClient.get(`/checklists/${id}`)),
  );

  return checklists.map((c) => c.data);
}
