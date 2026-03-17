type RegraTipo = {
  impureza: number;
  avariados: number;
};

type RegraProduto = {
  tipo1: RegraTipo;
  tipo2: RegraTipo;
};

const MAPA_RULES: Record<string, RegraProduto> = {
  soja: {
    tipo1: {
      impureza: 1,
      avariados: 8,
    },
    tipo2: {
      impureza: 2,
      avariados: 12,
    },
  },

  milho: {
    tipo1: {
      impureza: 1,
      avariados: 6,
    },
    tipo2: {
      impureza: 2,
      avariados: 10,
    },
  },
}; //alterar

export type Cultura = "Soja" | "Milho" | "Trigo";

export interface DadosClassificacao {
  cultura: Cultura;

  umidade: number;
  impureza: number;

  ardidos?: number;
  mofados?: number;
  germinados?: number;

  quebrados?: number;
  pesoHectolitro?: number;
}

export interface ResultadoClassificacao {
  tipo: string;
  observacao: string;
}

export function classificarMAPA(d: DadosClassificacao): ResultadoClassificacao {
  if (d.cultura === "Soja") {
    const totalAvariados =
      (d.ardidos || 0) + (d.mofados || 0) + (d.germinados || 0);

    if (d.umidade > 14)
      return { tipo: "FORA DE TIPO", observacao: "Umidade acima do limite" };

    if (d.impureza > 1)
      return { tipo: "FORA DE TIPO", observacao: "Impureza acima do limite" };

    if (totalAvariados > 8)
      return {
        tipo: "FORA DE TIPO",
        observacao: "Total de avariados acima do limite",
      };

    return { tipo: "TIPO 1", observacao: "Produto dentro do padrão" };
  }

  if (d.cultura === "Milho") {
    if (d.umidade > 14)
      return { tipo: "FORA DE TIPO", observacao: "Umidade acima do limite" };

    if (d.impureza > 1)
      return { tipo: "FORA DE TIPO", observacao: "Impureza acima do limite" };

    if ((d.quebrados || 0) > 6)
      return { tipo: "TIPO 2", observacao: "Alto índice de quebrados" };

    return { tipo: "TIPO 1", observacao: "Milho padrão" };
  }

  if (d.cultura === "Trigo") {
    if ((d.pesoHectolitro || 0) < 72)
      return { tipo: "FORA DE TIPO", observacao: "PH abaixo do mínimo" };

    return { tipo: "TIPO 1", observacao: "Trigo padrão" };
  }

  return { tipo: "FORA DE TIPO", observacao: "Cultura inválida" };
}

export function ratingcalculation(
  produto: string,
  valores: any,
  usarMapa: boolean,
) {
  if (!usarMapa) return null;

  const regras = MAPA_RULES[produto];

  if (!regras) return "PRODUTO_SEM_REGRA";

  const avariados = (valores.ardidos || 0) + (valores.quebrados || 0);

  if (
    valores.impureza <= regras.tipo1.impureza &&
    avariados <= regras.tipo1.avariados
  ) {
    return "TIPO 1";
  }

  if (
    valores.impureza <= regras.tipo2.impureza &&
    avariados <= regras.tipo2.avariados
  ) {
    return "TIPO 2";
  }

  return "FORA_PADRAO";
}

export function generateClassificationPDF(data: any) {
  if (!data) return;

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
 `;

  const win = window.open();

  if (win) {
    win.document.write(html);
    win.document.close();
    win.print();
  }

  return html;
}
