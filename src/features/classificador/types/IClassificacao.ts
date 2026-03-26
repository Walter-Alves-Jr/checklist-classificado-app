import { ResultadoClassificacao } from "./ClassificacaoResponse";
import { ICultura } from "./ICultura";

//validar se são esses dados para response
export interface IClassificacaoResponse {
  numeroAgendamento: number;
  placa: string;
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
