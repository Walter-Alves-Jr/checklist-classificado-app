export function gerarPDFChecklist(data:any){

 if(!data) return

 const html = `
 <html>
 <body style="font-family:Arial;padding:30px">

 <h2>CHECKLIST OPERACIONAL</h2>

 <p><b>Checklist:</b> ${data.checklist}</p>
 <p><b>Armazém:</b> ${data.armazem}</p>
 <p><b>Data:</b> ${data.data}</p>
 <p><b>GPS:</b> ${data.gps}</p>

 <hr/>

 ${Object.entries(data.respostas)
  .map(([id,res]) => `
  <p><b>Pergunta ${id}</b>: ${res}</p>
  `).join("")}

 </body>
 </html>
 `

 const win = window.open()

 if(win){
  win.document.write(html)
  win.document.close()
  win.print()
 }

 return html
}



export function gerarPDFClassificacao(data:any){

 if(!data) return

 const html = `
 <html>
 <body style="font-family:Arial;padding:30px">

 <h2>CLASSIFICAÇÃO DE GRÃOS</h2>

 <p><b>Cultura:</b> ${data.cultura}</p>

 <hr/>

 <p>Umidade: ${data.umidade}%</p>
 <p>Impureza: ${data.impureza}%</p>
 <p>Ardidos: ${data.ardidos}%</p>
 <p>Mofados: ${data.mofados}%</p>
 <p>Germinados: ${data.germinados}%</p>

 <hr/>

 <h3>Resultado</h3>

 <p><b>Tipo:</b> ${data.tipo}</p>
 <p><b>Status:</b> ${data.status}</p>
 <p>${data.observacao}</p>

 </body>
 </html>
 `

 const win = window.open()

 if(win){
  win.document.write(html)
  win.document.close()
  win.print()
 }

 return html
}