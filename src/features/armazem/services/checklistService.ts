import { CheckList, Checklist } from "@/_app/services/storage";
import { apiClient } from "@/src/shared/api/apiClient";

export const registerChecklistResponse = async (payload: Checklist) => {
  const response = await apiClient.post(`/checklist_respostas`, payload);
  return response.data;
};

export async function getChecklistByName(name: string) {
  const { data } = await apiClient.get(`/checklists?name=${name}`);
  return data[0];
}

export async function createChecklist(payload: CheckList) {
  const { data } = await apiClient.post("/checklists", payload);
  return data;
}

export async function updateChecklist(id: number, payload: CheckList) {
  const { data } = await apiClient.put(`/checklists/${id}`, payload);
  return data;
}

export const generateChecklistPDF = (data: any) => {
  if (!data) return;

  const html = `
 <html>
 <body style="font-family:Arial;padding:30px">

 <h2>CHECKLIST OPERACIONAL</h2>

 <p><b>Checklist:</b> ${data.checklistName}</p>
 <p><b>Armazém:</b> ${data.armazemId}</p>
 <p><b>Data:</b> ${data.data}</p>
 <p><b>GPS:</b> ${data.gps}</p>

 <hr/>

 ${Object.entries(data.respostas)
   .map(
     ([id, res]) => `
  <p><b>Pergunta ${id}</b>: ${res}</p>
  `,
   )
   .join("")}

 </body>
 </html>
 `;

  const win = window.open();

  if (win) {
    win.document.write(html);
    win.document.close();
    win.print();
  }

  return html;
};
