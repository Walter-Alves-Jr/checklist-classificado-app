import { queryClient } from "@/src/lib/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "../types/auth-response";
import { SessaoUsuario } from "../types/sessao-usuario";

export async function salvarSessaoUsuarioStorage(response: AuthResponse) {
  const { accessToken, expiresIn } = response.token;
  const { username, token, expirationDate } = response.token.refreshToken;

  const session: SessaoUsuario = {
    accessToken,
    expiresIn: Date.now() + expiresIn,
    refreshToken: {
      username,
      token,
      expirationDate,
    },
  };

  queryClient.setQueryData(["sessao_usuario"], session);
  await AsyncStorage.setItem("sessao_usuario", JSON.stringify(session));
}
