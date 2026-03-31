import { api } from "@/src/lib/axios/axios";
import { AuthResponse } from "../types/auth-response";

export class AuthRepository {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/authenticate", {
      username,
      password,
    });

    return response.data;
  }
}
