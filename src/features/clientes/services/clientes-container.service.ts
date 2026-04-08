import { SQLiteDatabase } from "expo-sqlite";
import { ClientesLocalRepository } from "../repositories/clientes-local.repository";
import { ClientesRepository } from "../repositories/clientes.repository";
import { ClientesService } from "./clientes.service";

/* centralizador(container) para "criação" dos serviços, 
 se precisar de outro é só referenciar ele aqui seguindo padrão abaixo. 
 O uso deles é feito através do hook useClientesService */

export function createClientesServices(db: SQLiteDatabase) {
  const clientesLocalRepository = new ClientesLocalRepository(db);
  const clientesRepository = new ClientesRepository();

  const clientesService = new ClientesService(
    clientesLocalRepository,
    clientesRepository,
  );

  return {
    clientesService,
  };
}
