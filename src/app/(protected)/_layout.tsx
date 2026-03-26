import { useAuth } from "@/src/auth/AuthProvider";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";

// se exisitir usuário/token -> permita que ele veja a tela inicial do app
// se não existir usuário/token -> redireciona ele para a tela de login

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AppContainer>
        <ActivityIndicator />
      </AppContainer>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/Login" />;
  }

  return <Slot />;
}
