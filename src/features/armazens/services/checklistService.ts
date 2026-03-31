import { api } from "@/src/lib/axios/axios";
import { Checklist } from "../../checklists/types/Checklist";
import { ChecklistExecuteType } from "../../checklists/types/ChecklistExecuteType";

export const registerChecklistResponse = async (
  payload: ChecklistExecuteType,
) => {
  const response = await api.post(`/checklist_respostas`, payload);
  return response.data;
};

export async function getChecklistByName(name: string) {
  const { data } = await api.get(`/checklists?name=${name}`);
  return data[0];
}

export async function getChecklistById(id: number): Promise<Checklist> {
  const { data } = await api.get<Checklist>(`/checklists/${id}`);
  return data;
}

export async function createChecklist(payload: Checklist) {
  const { data } = await api.post("/checklists", payload);
  return data;
}

export async function updateChecklist(id: number, payload: Checklist) {
  const { data } = await api.put(`/checklists/${id}`, payload);
  return data;
}

export const generateChecklistPDF = (data: any) => {
  if (!data) return;

  //   const html = `
  //  <html>
  //  <body style="font-family:Arial;padding:30px">

  //  <h2>CHECKLIST OPERACIONAL</h2>

  //  <p><b>Checklist:</b> ${data.checklistName}</p>
  //  <p><b>Armazém:</b> ${data.armazemName}</p>
  //  <p><b>Data:</b> ${data.data}</p>
  //  <p><b>GPS:</b> ${data.gps}</p>

  //  <hr/>

  //  ${Object.entries(data.respostas)
  //    .map(
  //      ([id, res]) => `
  //   <p><b>Pergunta ${id}</b>: ${res}</p>
  //   `,
  //    )
  //    .join("")}

  //  </body>
  //  </html>
  //  `;

  const win = window.open();

  if (win) {
    // win.document.write(html);
    win.document.close();
    win.print();
  }

  // return html;
};
