import { AppButton } from "@/src/shared/components/Button";
import { app_colors } from "@/src/shared/consts";
import { useBrand } from "@/src/theme/useBrand";
// import { ChartBarIcon, GearIcon, HouseIcon } from "@phosphor-icons/react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { View } from "react-native";

export default function AppMenuBottomOptions() {
  const route = usePathname();
  function goToHome() {
    router.push("/");
    console.log(route);
  }

  function goToConfiguracoes() {
    router.push("/(protected)/configuracoes");
    console.log(route);
  }

  function goToDashboard() {
    router.push("/(protected)/dashboard");
  }

  const brand = useBrand();

  return (
    <View className="rounded-t-3xl p-1 pt-2" style={brand.background.orange}>
      <View className="flex w-full flex-row items-center justify-around">
        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={() => goToHome()}
        >
          <AppButton.Icon>
            <Ionicons
              name={route === "/" ? "home-sharp" : "home-outline"}
              size={20}
              color={app_colors.color.primary}
            />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Home</AppButton.Text>
        </AppButton>

        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={goToDashboard}
        >
          <AppButton.Icon>
            <Ionicons
              name={
                route === "/dashboard" ? "bar-chart-sharp" : "bar-chart-outline"
              }
              size={20}
              color={app_colors.color.primary}
            />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Dashboard</AppButton.Text>
        </AppButton>

        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={goToConfiguracoes}
        >
          <AppButton.Icon>
            <Ionicons
              name={
                route === "/configuracoes"
                  ? "settings-sharp"
                  : "settings-outline"
              }
              size={20}
              color={app_colors.color.primary}
            />
          </AppButton.Icon>

          <AppButton.Text className="text-xs">Configurações</AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
