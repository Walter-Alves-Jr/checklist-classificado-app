import AsyncStorage from "@react-native-async-storage/async-storage"

/*
CHAVES STORAGE
*/

const PERGUNTAS_KEY = "PERGUNTAS_CHECKLIST"
const CHECKLIST_KEY = "CHECKLISTS"
const CLASSIFICACAO_KEY = "CLASSIFICACOES"

/*
TIPOS
*/

export type Pergunta = {
  id: string
  checklist: string
  pergunta: string
}

export type Checklist = {
  checklist: string
  armazem: string
  gps: string
  data: string
  respostas: any
  fotos: any[]
}

export type Classificacao = {

  agendamento: string
  placa: string
  motorista: string
  transportadora: string
  produto: string
  terminal: string

  cultura: string

  umidade: number
  impureza: number
  ardidos: number
  mofados: number
  germinados: number

  resultado: string

  status: "REALIZADA"

  data: string
}

/*
PERGUNTAS CHECKLIST
*/

export async function salvarPergunta(pergunta: Pergunta){

  const atual = await AsyncStorage.getItem(PERGUNTAS_KEY)

  const lista = atual ? JSON.parse(atual) : []

  lista.push(pergunta)

  await AsyncStorage.setItem(
    PERGUNTAS_KEY,
    JSON.stringify(lista)
  )

}

export async function salvarPerguntas(perguntas: Pergunta[]){

  await AsyncStorage.setItem(
    PERGUNTAS_KEY,
    JSON.stringify(perguntas)
  )

}

export async function listarPerguntas(): Promise<Pergunta[]>{

  const dados = await AsyncStorage.getItem(PERGUNTAS_KEY)

  return dados ? JSON.parse(dados) : []

}

/*
CHECKLIST
*/

export async function salvarChecklist(dados: Checklist){

  const atual = await AsyncStorage.getItem(CHECKLIST_KEY)

  const lista = atual ? JSON.parse(atual) : []

  lista.push(dados)

  await AsyncStorage.setItem(
    CHECKLIST_KEY,
    JSON.stringify(lista)
  )

}

export async function listarChecklists(): Promise<Checklist[]>{

  const dados = await AsyncStorage.getItem(CHECKLIST_KEY)

  return dados ? JSON.parse(dados) : []

}

/*
CLASSIFICAÇÃO DE GRÃOS
*/

export async function salvarClassificacao(dados: Classificacao){

  const atual = await AsyncStorage.getItem(CLASSIFICACAO_KEY)

  const lista = atual ? JSON.parse(atual) : []

  lista.push(dados)

  await AsyncStorage.setItem(
    CLASSIFICACAO_KEY,
    JSON.stringify(lista)
  )

}

export async function listarClassificacoes(): Promise<Classificacao[]>{

  const dados = await AsyncStorage.getItem(CLASSIFICACAO_KEY)

  return dados ? JSON.parse(dados) : []

}