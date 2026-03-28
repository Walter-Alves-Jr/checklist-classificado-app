export type AgendamentoRequest = {
  numeroAgendamento: number;
};

export type AgendamentoResponse = {
  numeroAgendamento: number;
  placaVeiculo: string;
  motorista: string;
  transportadora: string;
  produto: string;
  terminal: string;
};
