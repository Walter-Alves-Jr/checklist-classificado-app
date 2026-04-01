import { AppButton } from "@/src/shared/components/Button";
import AppText from "@/src/shared/components/Text/AppText";
import { runMigrations } from "@/src/sqlite/create-database";
import { useSQLiteContext } from "expo-sqlite";
import { Alert, View } from "react-native";

export default function AppRatings() {
  const db = useSQLiteContext();

  function handleRunMigrations() {
    Alert.alert(
      "Atenção",
      "Isso vai resetar todas as tabelas. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            await runMigrations(db);
          },
        },
      ],
    );
  }

  return (
    <View className="mt-5 flex flex-col gap-y-2">
      <AppText className="text-center text-xl font-bold">
        Classificações
      </AppText>

      <View className="mt-2 flex flex-row items-center justify-between gap-2">
        <View className="flex items-center">
          <AppText className="font-semibold leading-none" variant="grayDark">
            Realizadas
          </AppText>
          <AppText className="text-lg font-bold">10</AppText>
        </View>

        <View className="flex items-center">
          <AppText className="font-semibold leading-none" variant="grayDark">
            Pendentes
          </AppText>
          <AppText className="text-lg font-bold">2</AppText>
        </View>

        <View className="flex items-center">
          <AppText className="font-semibold leading-none" variant="grayDark">
            Recusadas
          </AppText>
          <AppText className="text-lg font-bold">4</AppText>
        </View>
      </View>

      <View className="mt-5 items-center">
        <AppButton useTheme={false} onPress={handleRunMigrations}>
          <AppButton.Text>Resetar Tabelas</AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
