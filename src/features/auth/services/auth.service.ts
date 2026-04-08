import { AuthRepository } from "../repositories/auth.repository";
import { AuthResponse } from "../types/auth-response";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async authenticate(login: string, senha: string): Promise<AuthResponse> {
    if (!login?.trim() || !senha?.trim()) {
      throw new Error("Informe login e senha");
    }

    try {
      return await this.authRepository.authenticate(login, senha);
    } catch {
      throw new Error("Login ou senha incorretos.");
    }
  }

  async logout() {
    await this.authRepository.logout();
  }
}
