import { IClassificacaoResponse } from "../types/classificacao.type";

export function buildHTML(data: IClassificacaoResponse) {
  const {
    cultura,
    umidade,
    impureza,
    ardidos,
    mofados,
    germinados,
    resultado,
  } = data;

  const aprovado = resultado.tipo === "TIPO 1";
  const statusColor = aprovado ? "#16a34a" : "#dc2626";
  const statusText = aprovado ? "APROVADO" : "REPROVADO";

  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8" />
  <title>Relatório de Classificação de Grãos</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      color: #1f2937;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    .logo {
      width: 100px;
      height: 100px;
      border-radius: 2rem;
    }

    .title {
      text-align: right;
    }

    .title h1 {
      margin: 0;
      font-size: 20px;
    }

    .card {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .section-title {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .item {
      font-size: 14px;
    }

    .result {
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      background: #f9fafb;
    }

    .tipo {
      font-size: 24px;
      font-weight: bold;
    }

    .status {
      font-size: 18px;
      font-weight: bold;
      color: ${statusColor};
    }

    .footer {
      margin-top: 40px;
      font-size: 12px;
      text-align: center;
      color: #6b7280;
    }
  </style>
  </head>

  <body>

    <div class="header">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVk567XnNO6g3WWibetB0SzNH4vh0cG7H7g&s" class="logo" />

      <div class="title">
        <h1>RELATÓRIO DE CLASSIFICAÇÃO DE GRÃOS</h1>
        <p>${new Date().toLocaleDateString()}</p>
      </div>
    </div>

    <div class="card">
      <div class="section-title">Informações Gerais</div>

      <div class="grid">
        <div class="item"><b>Cultura:</b> ${cultura.toUpperCase()}</div>
        <div class="item"><b>Umidade:</b> ${umidade}%</div>
        <div class="item"><b>Impureza:</b> ${impureza}%</div>
        <div class="item"><b>Ardidos:</b> ${ardidos}%</div>
        <div class="item"><b>Mofados:</b> ${mofados}%</div>
        <div class="item"><b>Germinados:</b> ${germinados}%</div>
      </div>
    </div>

    <div class="card result">
      <div class="section-title">Resultado da Classificação</div>

      <div class="tipo">${resultado.tipo}</div>
      <div class="status">${statusText}</div>

      <p style="margin-top:10px">${resultado.observacao}</p>
    </div>

    <div class="footer">
      Documento gerado automaticamente • Sistema de Classificação de Grãos
    </div>

  </body>
  </html>
  `;
}
