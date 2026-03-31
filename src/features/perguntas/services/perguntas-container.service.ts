import { SQLiteDatabase } from "expo-sqlite";
import { PerguntasLocalRepository } from "../repositories/perguntas-local.repository";
import { PerguntasRepository } from "../repositories/perguntas.repository";
import { PerguntasService } from "./perguntas.service";

/* centralizador(container) para "criação" dos serviços, 
 se precisar de outro é só referenciar ele aqui seguindo padrão abaixo. 
 O uso deles é feito através do hook usePerguntasServices */

export function createPerguntasServices(db: SQLiteDatabase) {
  const perguntasRepository = new PerguntasRepository();
  const perguntasLocalRepository = new PerguntasLocalRepository(db);

  const perguntasService = new PerguntasService(
    perguntasRepository,
    perguntasLocalRepository,
  );

  return {
    perguntasService,
  };
}
