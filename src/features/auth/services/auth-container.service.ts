import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "./auth.service";

/* centralizador(container) para "criação" dos serviços, 
 se precisar de outro é só referenciar ele aqui seguindo padrão abaixo. 
 O uso deles é feito através do hook useAuthService */

export function createAuthServices() {
  const authRepository = new AuthRepository();
  const authService = new AuthService(authRepository);

  return {
    authService,
  };
}
