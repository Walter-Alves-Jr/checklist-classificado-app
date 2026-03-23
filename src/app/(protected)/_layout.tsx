import { useAuth } from "@/src/auth/AuthProvider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, ScrollView } from "react-native";

// se exisitir usuário/token -> permita que ele veja a tela inicial do app
// se não existir usuário/token -> redireciona ele para a tela de login

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <ScrollView className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </ScrollView>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
