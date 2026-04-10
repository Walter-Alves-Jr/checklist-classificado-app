export type AgendamentoRequest = {
  numeroAgendamento: number;
};

export interface AgendamentoResponse {
  cesv: number;
  veiculo: Veiculo;
  possuiValePedagio: boolean;
  placas: string[];
  dataAgendamento: string;
  dataJanelaInicio: string;
  dataCriacao: string;
  dataJanelaFim: string;
  codigoStatus: string;
  status: string;
  volume: number;
  agendador: ParceiroNegocio;
  fornecedor: Fornecedor;
  operacao: string;
  planta: Planta;
  produto: Produto;
  tipoVeiculo: string;
  pesoBrutoReferencia: number;
  motorista: Motorista;
  numeroContrato: string | null;
  referenciaContrato: string | null;
  incoterms: string;
  contratos: any[];
  documentos: any[];
  dinamicos: CampoDinamico[];
  tomador: Tomador;
  anexos: any[];
  dadosGenericos: DadosGenericos;
  historico: Historico[];
  identificadorOrigem: string;
}

interface Veiculo {
  placa: string;
  renavan: string | null;
  cpfCnpj: string | null;
  uf: string | null;
  anoFabricacao: number | null;
  tag: string | null;
  proprietario: string | null;
  chassi: string | null;
  cor: string | null;
  numeroRntrc: string | null;
  vencimentoRntrc: string | null;
  numeroAet: string | null;
  vencimentoAet: string | null;
  tipoVeiculo: string;
  pesoBrutoReferencia: number;
  cep: string | null;
  cidade: string | null;
  ibge: string | null;
  tara: number | null;
  rntrc: string | null;
  numeroCiv: string | null;
  numeroCipp: string | null;
  numeroCippLacre: string | null;
  numeroCvvtr: string | null;
  numeroIbama: string | null;
  numeroDocsp: string | null;
  numeroCrv: string | null;
  dataVencimentoCrv: string | null;
  dataVencimentoCiv: string | null;
  numeroDoctoVeiculo: string | null;
  dataDoctoVeiculo: string | null;
  dataVencimentoCvvtr: string | null;
  dataVencimentoCipp: string | null;
  dataVencimentoIbama: string | null;
  tipo: string;
  compartimentos: any[];
}

interface Motorista {
  cpf: string;
  nome: string;
  cnh: string;
  estrangeiro: boolean;
  categoriaCarteira: string | null;
  rg: string;
  emissorRg: string | null;
  validadeCnh: string | null;
  endereco: string | null;
  cep: string | null;
  uf: string | null;
  cidade: string | null;
  ibgeCidade: string | null;
  bairro: string | null;
  numero: string;
  complemento: string | null;
  telefone: string;
  casado: boolean | null;
  nomeConjuge: string | null;
  quantidadeFilhos: number | null;
  registroCnh: string | null;
  ufCnh: string | null;
  nomeMae: string | null;
  dataNascimento: string | null;
  numeroPid: string | null;
  dataVencimentoPid: string | null;
  numeroMopp: string | null;
  dataVencimentoMopp: string | null;
  dataIntegracao: string | null;
}

interface ParceiroNegocio {
  cnpjCpf: string;
  inscricaoEstadual: string | null;
  codigo: string | null;
  uf: string | null;
  cidade: string | null;
  endereco: string | null;
  bairro: string | null;
  telefone: string | null;
  cep: string | null;
  numeroRctrc: string | null;
  validadeRctrc: string | null;
  numeroRntrc: string | null;
  validadeRntrc: string | null;
  registroAntt: string | null;
  validadeAntt: string | null;
  validadeApolice: string | null;
  validadeSintegra: string | null;
  veiculoAlugado: boolean;
  razaoSocial: string;
}

interface Fornecedor {
  cnpjCpf: string;
  inscricaoEstadual: string | null;
  codigo: string | null;
  razaoSocial: string;
}

interface Planta {
  codigo: string;
  denominacao: string;
}

interface Produto {
  codigo: string;
  denominacao: string;
  unidadeMedida: string;
}

interface CampoDinamico {
  codigo: string;
  valor: string;
  tipo: string;
}

interface Tomador {
  codigo: string | null;
  denominacao: string | null;
}

interface DadosGenericos {
  peso1: number;
  peso2: number;
  numero1: number;
  numero2: number;
}

interface Historico {
  codStatus: string;
  denStatus: string;
  data: string;
}
