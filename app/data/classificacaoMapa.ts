type RegraTipo = {
  impureza: number
  avariados: number
}

type RegraProduto = {
  tipo1: RegraTipo
  tipo2: RegraTipo
}

export const MAPA_RULES: Record<string, RegraProduto> = {
  soja: {
    tipo1: {
      impureza: 1,
      avariados: 8
    },
    tipo2: {
      impureza: 2,
      avariados: 12
    }
  },

  milho: {
    tipo1: {
      impureza: 1,
      avariados: 6
    },
    tipo2: {
      impureza: 2,
      avariados: 10
    }
  }
}