import { queryClient } from "@/src/lib/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "sessao_usuario";

export async function removerSessaoUsuarioStorage() {
  queryClient.clear();
  await AsyncStorage.removeItem(SESSION_KEY);
}
