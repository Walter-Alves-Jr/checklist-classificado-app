import { AppButton } from "@/src/shared/components/Button";
import { app_colors } from "@/src/shared/consts";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { View } from "react-native";

export default function AppMenuOptions() {
  function goToChecklist() {
    router.push("/armazens");
  }
  function goToRegisterQuestions() {
    router.push("/perguntas");
  }
  function goToRate() {
    router.push("/classificador");
  }
  function goToSynchronize() {
    router.push("/sincronizar");
  }

  return (
    <View className="mt-5 flex flex-col gap-4 p-4">
      <View className="flex flex-row gap-4">
        <AppButton
          useTheme={false}
          className="flex flex-1 flex-row items-center"
          onPress={goToChecklist}
        >
          <AppButton.Icon>
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              size={35}
              color={app_colors.color.primary}
              className="mr-1"
            />
          </AppButton.Icon>
          <AppButton.Text className="flex-1 leading-tight">
            Checklist
          </AppButton.Text>
        </AppButton>
        <AppButton
          className="flex flex-1 flex-row items-center"
          onPress={goToRegisterQuestions}
        >
          <AppButton.Icon>
            <AntDesign
              name="question-circle"
              size={35}
              color={app_colors.color.primary}
              className="mr-1"
            />
          </AppButton.Icon>
          <AppButton.Text className="flex-1 leading-tight">
            Cadastrar Perguntas
          </AppButton.Text>
        </AppButton>
      </View>

      <View className="flex flex-row gap-4">
        <AppButton
          className="flex flex-1 flex-row items-center"
          onPress={goToRate}
        >
          <AppButton.Icon>
            <MaterialCommunityIcons
              name="grain"
              size={35}
              color={app_colors.color.primary}
              className="mr-1"
            />
          </AppButton.Icon>
          <AppButton.Text className="flex-1 leading-tight">
            Classificador de Grãos
          </AppButton.Text>
        </AppButton>
        <AppButton
          className="flex flex-1 flex-row items-center"
          useTheme={false}
          onPress={goToSynchronize}
        >
          <AppButton.Icon>
            <MaterialCommunityIcons
              name="sync"
              size={35}
              color={app_colors.color.primary}
              className="mr-1"
            />
          </AppButton.Icon>
          <AppButton.Text className="flex-1 leading-tight">
            Sincronizar
          </AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
