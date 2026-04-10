import { queryClient } from "@/src/lib/react-query";
import { STORAGE } from "@/src/shared/consts/storage-keys";
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

  queryClient.setQueryData([STORAGE.SESSION_USUARIO], session);
  await AsyncStorage.setItem(STORAGE.SESSION_USUARIO, JSON.stringify(session));
  await AsyncStorage.setItem(STORAGE.TOKEN_USUARIO, accessToken);
}
