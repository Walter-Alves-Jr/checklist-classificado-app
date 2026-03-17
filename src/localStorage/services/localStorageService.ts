import { ChecklistExecuteType } from "@/src/features/checklist/types/ChecklistExecuteType";
import { ClassificacaoType } from "@/src/features/classificador/types/ClassificacaoType";
import { QuestionType } from "@/src/features/questions/types/QuestionType";
import AsyncStorage from "@react-native-async-storage/async-storage";

// CHAVES STORAGE
const PERGUNTAS_KEY = "PERGUNTAS_CHECKLIST";
const CHECKLIST_KEY = "CHECKLISTS";
const CLASSIFICACAO_KEY = "CLASSIFICACOES";

// PERGUNTAS CHECKLIST
export async function salvarPergunta(pergunta: QuestionType) {
  const atual = await AsyncStorage.getItem(PERGUNTAS_KEY);

  const lista = atual ? JSON.parse(atual) : [];

  lista.push(pergunta);

  await AsyncStorage.setItem(PERGUNTAS_KEY, JSON.stringify(lista));
}

export async function salvarPerguntas(perguntas: QuestionType[]) {
  await AsyncStorage.setItem(PERGUNTAS_KEY, JSON.stringify(perguntas));
}

export async function listarPerguntas(): Promise<QuestionType[]> {
  const dados = await AsyncStorage.getItem(PERGUNTAS_KEY);

  return dados ? JSON.parse(dados) : [];
}

/*
CHECKLIST
*/

export async function registerChecklistResponseLocalStorage(
  dados: ChecklistExecuteType,
) {
  const atual = await AsyncStorage.getItem(CHECKLIST_KEY);

  const lista = atual ? JSON.parse(atual) : [];

  lista.push(dados);

  await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(lista));
}

export async function getChecklistsLocalStorage(): Promise<
  ChecklistExecuteType[]
> {
  const dados = await AsyncStorage.getItem(CHECKLIST_KEY);

  return dados ? JSON.parse(dados) : [];
}

/*
CLASSIFICAÇÃO DE GRÃOS
*/

export async function registerClassificationLocalStorage(
  dados: ClassificacaoType,
) {
  const atual = await AsyncStorage.getItem(CLASSIFICACAO_KEY);

  const lista = atual ? JSON.parse(atual) : [];

  lista.push(dados);

  await AsyncStorage.setItem(CLASSIFICACAO_KEY, JSON.stringify(lista));
}

export async function getClassificationsLocalStorage(): Promise<
  ClassificacaoType[]
> {
  const dados = await AsyncStorage.getItem(CLASSIFICACAO_KEY);

  return dados ? JSON.parse(dados) : [];
}
