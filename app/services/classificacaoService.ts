import { MAPA_RULES } from "../data/classificacaoMapa"

export function calcularClassificacao(
  produto: string,
  valores: any,
  usarMapa: boolean
) {

  if (!usarMapa) return null

  const regras = MAPA_RULES[produto]

  if (!regras) return "PRODUTO_SEM_REGRA"

  const avariados =
    (valores.ardidos || 0) +
    (valores.quebrados || 0)

  if (
    valores.impureza <= regras.tipo1.impureza &&
    avariados <= regras.tipo1.avariados
  ) {
    return "TIPO 1"
  }

  if (
    valores.impureza <= regras.tipo2.impureza &&
    avariados <= regras.tipo2.avariados
  ) {
    return "TIPO 2"
  }

  return "FORA_PADRAO"
}