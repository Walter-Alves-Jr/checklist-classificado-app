import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { createClientesServices } from "../services/clientes-container.service";

/* Hook central para utilizar os serviços "criados" no clientes.service.container.ts */
export function useClientesServices() {
  const db = useSQLiteContext();

  return useMemo(() => createClientesServices(db), [db]);
}
