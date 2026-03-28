import { SQLiteDatabase } from "expo-sqlite";
import { AgendamentosLocalRepository } from "../repositories/agendamentos/agendamentos-local-repository";
import { AgendamentosRepository } from "../repositories/agendamentos/agendamentos-repository";
import { AgendamentoService } from "./agendamento-service";

/* centralizador(container) para "criação" dos serviços, 
 se precisar de outro é só referenciar ele aqui seguindo padrão abaixo. 
 O uso deles é feito através do hook useClassificadorServices */

export function createClassificadorServices(db: SQLiteDatabase) {
  const agendamentoRepository = new AgendamentosRepository();
  const agendamentoLocalRepository = new AgendamentosLocalRepository(db);

  const agendamentoService = new AgendamentoService(
    agendamentoLocalRepository,
    agendamentoRepository,
  );

  return {
    agendamentoService,
  };
}
