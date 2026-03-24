import { AppButton } from "@/src/shared/components/Button";
import { app_colors } from "@/src/shared/consts";
import { useBrand } from "@/src/theme/useBrand";
import { ChartBarIcon, GearIcon, HouseIcon } from "@phosphor-icons/react";
import { router } from "expo-router";
import { View } from "react-native";

export default function AppMenuBottomOptions() {
  function goToHome() {
    router.push("/");
  }

  const brand = useBrand();

  return (
    <View className="rounded-t-3xl p-1" style={brand.bgPrimary}>
      <View className="flex w-full flex-row items-center justify-around">
        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={() => goToHome()}
        >
          <AppButton.Icon>
            <HouseIcon
              size={20}
              color={app_colors.color.primary}
              weight="fill"
            />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Home</AppButton.Text>
        </AppButton>

        <AppButton className="flex w-1/3 flex-col items-center bg-transparent p-1">
          <AppButton.Icon>
            <ChartBarIcon size={20} color={app_colors.color.primary} />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Dashboard</AppButton.Text>
        </AppButton>

        <AppButton className="flex w-1/3 flex-col items-center bg-transparent p-1">
          <AppButton.Icon>
            <GearIcon size={20} color={app_colors.color.primary} />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Configurações</AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
