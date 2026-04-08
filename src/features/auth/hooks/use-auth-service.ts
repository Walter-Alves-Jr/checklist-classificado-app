import { useMemo } from "react";
import { createAuthServices } from "../services/auth-container.service";

/* Hook central para utilizar os serviços "criados" no auth.service.container.ts */
export function useAuthService() {
  return useMemo(() => createAuthServices(), []);
}
