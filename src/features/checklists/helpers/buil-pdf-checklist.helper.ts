export function buildPdfChecklist(data: any) {
  return `
   <html>
   <body style="font-family:Arial;padding:30px">

   <h2>CHECKLIST OPERACIONAL</h2>

   <p><b>Checklist:</b> ${data.checklistName}</p>
   <p><b>Armazém:</b> ${data.armazemName}</p>
   <p><b>Data:</b> ${data.data}</p>
   <p><b>GPS:</b> ${data.gps ? data.gps : ""}</p>

   <hr/>

   ${Object.entries(data.respostas)
     .map(([id, value]) => {
       return `
    <p><b>Pergunta ${id}</b>: ${value === "true" ? "sim" : "não"}</p>
    `;
     })
     .join("")}

   </body>
   </html>
   `;
}
