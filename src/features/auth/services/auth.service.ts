import { AuthRepository } from "../repositories/auth.repository";
import { authStorage } from "./auth-storage.service";

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async login(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Credenciais inválidas");
    }

    const response = await this.repository.login(username, password);

    if (!response.token?.accessToken) {
      throw new Error("Token inválido");
    }

    await authStorage.save(response.token);

    return response;
  }

  async logout() {
    await authStorage.remove();
  }

  async getSession() {
    return await authStorage.get();
  }
}
