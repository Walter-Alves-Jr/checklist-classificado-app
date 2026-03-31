import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";

export function useAuthServer() {
  const repository = new AuthRepository();
  const service = new AuthService(repository);

  async function signIn(username: string, password: string) {
    try {
      const response = await service.login(username, password);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error("error", error);

      return {
        success: false,
        error: "Usuário ou senha inválidos.",
      };
    }
  }

  async function signOut() {
    await service.logout();
  }

  return {
    signIn,
    signOut,
  };
}
