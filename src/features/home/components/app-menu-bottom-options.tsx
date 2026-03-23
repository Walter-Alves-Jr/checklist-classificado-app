import { AppButton } from "@/src/shared/components/Button";
import { useTwTheme } from "@/src/theme/useTwTheme";
import { ChartBarIcon, GearIcon, HouseIcon } from "@phosphor-icons/react";
import { router } from "expo-router";
import { View } from "react-native";

export default function AppMenuBottomOptions() {
  function goToHome() {
    router.push("/");
  }

  const tw = useTwTheme();

  return (
    <View className="rounded-t-3xl p-1" style={tw.bgPrimary}>
      <View className="flex flex-row items-center justify-around gap-2">
        <AppButton
          className="flex flex-col items-center bg-transparent p-1"
          onPress={() => goToHome()}
        >
          <AppButton.Icon>
            <HouseIcon size={20} color="#e5e7eb" weight="fill" />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Home</AppButton.Text>
        </AppButton>

        <AppButton className="flex flex-col items-center bg-transparent p-1">
          <AppButton.Icon>
            <ChartBarIcon size={20} color="#e5e7eb" />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Dashboard</AppButton.Text>
        </AppButton>

        <AppButton className="flex flex-col items-center bg-transparent p-1">
          <AppButton.Icon>
            <GearIcon size={20} color="#e5e7eb" />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Configurações</AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
