import { ResultadoClassificacao } from "../types/classificacao-response.type";
import { IClassificacaoRequest } from "../types/classificacao.type";

export function tipo1(
  observacao: string = "Produto dentro do padrão",
): ResultadoClassificacao {
  return { tipo: "TIPO 1", observacao };
}

export function tipo2(observacao: string): ResultadoClassificacao {
  return { tipo: "TIPO 2", observacao };
}

export function foraTipo(observacao: string): ResultadoClassificacao {
  return { tipo: "FORA DE TIPO", observacao };
}

export function aplicarMapa(d: IClassificacaoRequest) {
  const mapa = {
    soja: () => {
      const totalAvariados =
        (d.ardidos ?? 0) + (d.mofados ?? 0) + (d.germinados ?? 0);

      if (d.umidade > 14) return foraTipo("Umidade acima do limite");

      if (d.impureza > 1) return foraTipo("Impureza acima do limite");

      if (totalAvariados > 8)
        return foraTipo("Total de avariados acima do limite");

      return tipo1();
    },

    milho: () => {
      if (d.umidade > 14) return foraTipo("Umidade acima do limite");

      if (d.impureza > 1) return foraTipo("Impureza acima do limite");

      if ((d.quebrados ?? 0) > 6) return tipo2("Alto índice de quebrados");

      return tipo1();
    },

    trigo: () => {
      if ((d.pesoHectolitro ?? 0) < 72) return foraTipo("PH abaixo do mínimo");

      return tipo1();
    },
  };

  return mapa;
}
