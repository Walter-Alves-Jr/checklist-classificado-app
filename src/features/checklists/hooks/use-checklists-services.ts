import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { createChecklistsServices } from "../services/checklists-container.service";

/* Hook central para utilizar os serviços "criados" no checklists-container.service.ts */
export function useChecklistsServices() {
  const db = useSQLiteContext();

  return useMemo(() => createChecklistsServices(db), [db]);
}
