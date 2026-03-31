import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { createPerguntasServices } from "../services/perguntas-container.service";

/* Hook central para utilizar os serviços "criados" no perguntas-container.service.ts */
export function usePerguntasServices() {
  const db = useSQLiteContext();

  return useMemo(() => createPerguntasServices(db), [db]);
}
