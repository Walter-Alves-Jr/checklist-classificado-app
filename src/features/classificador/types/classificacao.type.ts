import { ResultadoClassificacao } from "./classificacao-response.type";
import { ICultura } from "./cultura.type";

//validar se são esses dados para response
export interface IClassificacaoResponse {
  numeroAgendamento: number;
  placaVeiculo: string;
  motorista: string;
  transportadora: string;
  produto: string;
  terminal: string;
  cultura: ICultura;
  umidade: number;
  impureza: number;
  ardidos: number;
  mofados: number;
  germinados: number;
  quebrados: number;
  resultado: ResultadoClassificacao;
  status?: string;
  data?: string; // DATE
}

export interface IClassificacaoRequest {
  cultura: ICultura;
  umidade: number;
  impureza: number;
  ardidos?: number;
  mofados?: number;
  germinados?: number;
  quebrados?: number;
  pesoHectolitro?: number;
}
