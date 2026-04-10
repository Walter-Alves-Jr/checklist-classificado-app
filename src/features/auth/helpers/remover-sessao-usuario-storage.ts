import { queryClient } from "@/src/lib/react-query";
import { STORAGE } from "@/src/shared/consts/storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removerSessaoUsuarioStorage() {
  queryClient.clear();
  await AsyncStorage.removeItem(STORAGE.SESSION_USUARIO);
  await AsyncStorage.removeItem(STORAGE.TOKEN_USUARIO);
}
