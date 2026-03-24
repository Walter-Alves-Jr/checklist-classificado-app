import { AppButton } from "@/src/shared/components/Button";
import { app_colors } from "@/src/shared/consts";
import {
  ArrowsClockwiseIcon,
  GrainsIcon,
  ListChecksIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
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
        <AppButton useTheme={false} className="flex-1" onPress={goToChecklist}>
          <AppButton.Icon>
            <ListChecksIcon size={35} color={app_colors.color.primary} />
          </AppButton.Icon>
          <AppButton.Text>Checklist</AppButton.Text>
        </AppButton>
        <AppButton className="flex-1" onPress={goToRegisterQuestions}>
          <AppButton.Icon>
            <QuestionIcon size={35} color={app_colors.color.primary} />
          </AppButton.Icon>
          <AppButton.Text>
            Cadastrar
            <br />
            Perguntas
          </AppButton.Text>
        </AppButton>
      </View>

      <View className="flex flex-row gap-4">
        <AppButton className="flex-1" onPress={goToRate}>
          <AppButton.Icon>
            <GrainsIcon size={35} color={app_colors.color.primary} />
          </AppButton.Icon>
          <AppButton.Text>
            Classificador <br />
            de Grãos
          </AppButton.Text>
        </AppButton>
        <AppButton
          className="flex-1"
          useTheme={false}
          onPress={goToSynchronize}
        >
          <AppButton.Icon>
            <ArrowsClockwiseIcon size={35} color={app_colors.color.primary} />
          </AppButton.Icon>
          <AppButton.Text>Sincronizar</AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
