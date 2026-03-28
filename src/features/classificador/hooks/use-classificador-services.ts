import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { createClassificadorServices } from "../services/classificador-service.container";

/* Hook central para utilizar os serviços "criados" no classificador-services.container.ts */
export function useClassificadorServices() {
  const db = useSQLiteContext();

  return useMemo(() => createClassificadorServices(db), [db]);
}
