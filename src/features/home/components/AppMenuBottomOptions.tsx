import { AppButton } from "@/src/shared/components/Button";
import { app_colors } from "@/src/shared/consts";
import { useBrand } from "@/src/theme/useBrand";
// import { ChartBarIcon, GearIcon, HouseIcon } from "@phosphor-icons/react";
import { useClassificadorDatabase } from "@/src/sqlite/classificador/useClassificadorDatabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View } from "react-native";

export default function AppMenuBottomOptions() {
  function goToHome() {
    router.push("/");
  }
  const classificador = useClassificadorDatabase();

  async function create() {
    try {
      const response = await classificador.create({
        name: "Teste 1",
        quantity: 2,
      });

      alert("Produto cadastrado com o ID: " + response.insertedRowId);
    } catch (error) {
      console.log(error);
    }
  }

  async function list() {
    try {
      const response = await classificador.searchByName("Teste 1");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const brand = useBrand();

  return (
    <View
      className="rounded-t-3xl p-1 pb-6 pt-2"
      style={brand.background.orange}
    >
      <View className="flex w-full flex-row items-center justify-around">
        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={() => goToHome()}
        >
          <AppButton.Icon>
            <Ionicons
              name="home-outline"
              size={20}
              color={app_colors.color.primary}
            />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Home</AppButton.Text>
        </AppButton>

        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={create}
        >
          <AppButton.Icon>
            <Ionicons
              name="bar-chart-outline"
              size={20}
              color={app_colors.color.primary}
            />
          </AppButton.Icon>
          <AppButton.Text className="text-xs">Dashboard</AppButton.Text>
        </AppButton>

        <AppButton
          className="flex w-1/3 flex-col items-center bg-transparent p-1"
          onPress={list}
        >
          <AppButton.Icon>
            <Ionicons
              name="settings-outline"
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
