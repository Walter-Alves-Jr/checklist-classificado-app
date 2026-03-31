import { SQLiteDatabase } from "expo-sqlite";
import { ArmazensLocalRepository } from "../repositories/armazens-local.repository";
import { ArmazensRepository } from "../repositories/armazens.repository";
import { ArmazemService } from "./armazens.service";

/* centralizador(container) para "criação" dos serviços, 
 se precisar de outro é só referenciar ele aqui seguindo padrão abaixo. 
 O uso deles é feito através do hook useArmazensServices */

export function createArmazensServices(db: SQLiteDatabase) {
  const armazensRepository = new ArmazensRepository();
  const armazensLocalRepository = new ArmazensLocalRepository(db);

  const armazensService = new ArmazemService(
    armazensRepository,
    armazensLocalRepository,
  );

  return {
    armazensService,
  };
}
