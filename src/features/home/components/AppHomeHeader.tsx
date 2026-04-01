import { useAuth } from "@/src/auth/AuthProvider";
import { AppButton } from "@/src/shared/components/Button";
import { Logo } from "@/src/shared/components/Logo";
import AppText from "@/src/shared/components/Text/AppText";
import { app_colors } from "@/src/shared/consts";
import { useBrand } from "@/src/theme/useBrand";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

export default function AppHomeHeader() {
  const brand = useBrand();
  const { logout } = useAuth();

  async function logoutUser() {
    await logout();
  }

  return (
    <>
      <View style={brand.background.orange}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Logo />
            <View className="items-left flex flex-col">
              <AppText className="text-xs font-normal">Bem-vindo(a),</AppText>
              <AppText className="font-semibold leading-3 text-gray-200">
                {/* {brand.name} */}
                Admin
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
