import { AppButton } from "@/src/shared/components/Button";
import { Logo } from "@/src/shared/components/Logo";
import AppText from "@/src/shared/components/Text/text";
import { app_colors } from "@/src/shared/consts";
import { useBrand } from "@/src/theme/useBrand";
import { View } from "react-native";
import { Icon } from "react-native-paper";

export default function AppHomeHeader() {
  const brand = useBrand();

  return (
    <>
      <View style={brand.bgPrimary}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Logo />
            <View className="items-left flex flex-col">
              <AppText className="text-xs font-normal">Bem-vindo(a),</AppText>
              <AppText className="font-semibold leading-3 text-gray-200">
                {brand.name}
              </AppText>
            </View>
          </View>

          <AppButton>
            <AppButton.Icon>
              <Icon
                size={20}
                source="logout"
                color={app_colors.color.primary}
              />
            </AppButton.Icon>
          </AppButton>
        </View>
      </View>
    </>
  );
}
