import { useSessaoUsuario } from "@/src/features/auth/hooks/storage/queries/use-sessao-usuario.query";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// se usuário logado -> redireciona ele para a página inicial
// se usuário deslogado/sem token -> permita que ele veja a tela para efetuar login

export default function AuthLayout() {
  const { data: sessao, isLoading } = useSessaoUsuario();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!isLoading && sessao?.accessToken) {
    return <Redirect href="/(protected)" />;
  }

  return <Slot />;
}
