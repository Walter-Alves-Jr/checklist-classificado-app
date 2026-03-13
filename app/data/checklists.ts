export type TipoResposta =
  | "boolean"
  | "texto"

export type Pergunta = {
  id: number
  pergunta: string
  tipo: TipoResposta
}

export const checklists: Record<string, Pergunta[]> = {

  "Armazém A": [

    {
      id: 1,
      pergunta: "Lona do caminhão está íntegra?",
      tipo: "boolean"
    },

    {
      id: 2,
      pergunta: "Motorista apresentou documentação?",
      tipo: "boolean"
    },

    {
      id: 3,
      pergunta: "Observações",
      tipo: "texto"
    }

  ],

  "Armazém B": [

    {
      id: 4,
      pergunta: "Caminhão está limpo?",
      tipo: "boolean"
    }

  ]

}