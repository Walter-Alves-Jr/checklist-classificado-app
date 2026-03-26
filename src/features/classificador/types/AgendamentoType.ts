export type AgendamentoRequest = {
  numeroAgendamento: number;
};

export type AgendamentoResponse = {
  placa: string;
  motorista: string;
  transportadora: string;
  produto: string;
  terminal: string;
};
