import {
  AppHomeHeader,
  AppMenuBottomOptions,
} from "@/src/features/home/components";
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// se exisitir usuário/token -> permita que ele veja a tela inicial do app
// se não existir usuário/token -> redireciona ele para a tela de login

export default function ProtectedLayout() {
  // const { isAuthenticated, isLoading } = useAuth();

  // return (
  //   <AppContainer>
  //     <ActivityIndicator />
  //   </AppContainer>
  // );

  // if (!isAuthenticated) {
  //   return <Redirect href="/(auth)/login" />;
  // }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppHomeHeader />

        <Slot />

        <View className="absolute bottom-0 w-full">
          <SafeAreaView>
            <AppMenuBottomOptions />
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </>
  );
}
