import { useSession } from "@/src/features/clientes/hooks/storage/queries/use-session-query";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// se usuário logado -> redireciona ele para a página inicial
// se usuário deslogado/sem token -> permita que ele veja a tela para efetuar login

export default function AuthLayout() {
  const { data: cliente, isLoading } = useSession();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (cliente) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
