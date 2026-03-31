import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { createArmazensServices } from "../services/armazens-container.service";

/* Hook central para utilizar os serviços "criados" no armazens-container.service.ts */
export function useArmazensServices() {
  const db = useSQLiteContext();

  return useMemo(() => createArmazensServices(db), [db]);
}
