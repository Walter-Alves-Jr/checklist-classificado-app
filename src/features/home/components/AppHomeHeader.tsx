import { queryClient } from "@/src/lib/react-query";
import { AppButton } from "@/src/shared/components/Button";
import { Logo } from "@/src/shared/components/Logo";
import AppText from "@/src/shared/components/Text/AppText";
import { app_colors } from "@/src/shared/consts";
import { useBrand } from "@/src/theme/useBrand";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View } from "react-native";

export default function AppHomeHeader() {
  const brand = useBrand();

  async function logoutUser() {
    queryClient.setQueryData(["cliente"], null);
    queryClient.removeQueries({ queryKey: ["cliente"] });
    await AsyncStorage.removeItem("cliente");

    router.replace("/(auth)/login");
  }

  return (
    <>
      <View style={brand.background.primary}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Logo />
            <View className="items-left flex flex-col p-4">
              <AppText className="text-xs font-normal">Bem-vindo(a),</AppText>
              <AppText className="font-semibold leading-3 text-gray-200">
                {brand.name}
              </AppText>
            </View>
          </View>

          <AppButton onPress={logoutUser}>
            <AppButton.Icon>
              <MaterialCommunityIcons
                size={20}
                name="logout"
                color={app_colors.color.primary}
              />
            </AppButton.Icon>
          </AppButton>
        </View>
      </View>
    </>
  );
}
