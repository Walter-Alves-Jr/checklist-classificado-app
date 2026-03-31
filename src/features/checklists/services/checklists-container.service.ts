import { SQLiteDatabase } from "expo-sqlite";
import { ChecklistsLocalRepository } from "../repositories/checklists-local.repository";
import { ChecklistsRepository } from "../repositories/checkslists.repository";
import { ChecklistsService } from "./checklists.service";

/* centralizador(container) para "criação" dos serviços, 
 se precisar de outro é só referenciar ele aqui seguindo padrão abaixo. 
 O uso deles é feito através do hook useChecklistsServices */

export function createChecklistsServices(db: SQLiteDatabase) {
  const checklistsRepository = new ChecklistsRepository();
  const checklistsLocalRepository = new ChecklistsLocalRepository(db);

  const checklistsService = new ChecklistsService(
    checklistsRepository,
    checklistsLocalRepository,
  );

  return {
    checklistsService,
  };
}
