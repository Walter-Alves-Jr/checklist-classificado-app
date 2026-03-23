import { AppButton } from "@/src/shared/components/Button";
import { Logo } from "@/src/shared/components/Logo";
import AppText from "@/src/shared/components/Text/text";
import { useTwTheme } from "@/src/theme/useTwTheme";
import { View } from "react-native";
import { Icon } from "react-native-paper";

export default function AppHomeHeader() {
  const tw = useTwTheme();

  return (
    <>
      <View style={tw.bgPrimary}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Logo />
            <View className="items-left flex flex-col">
              <AppText className="text-xs font-normal">Bem-vindo(a),</AppText>
              <AppText className="font-semibold leading-3 text-gray-200">
                {tw.name}
              </AppText>
            </View>
          </View>

          <AppButton>
            <AppButton.Icon>
              <Icon size={20} source="logout" color="#e5e7eb" />
            </AppButton.Icon>
          </AppButton>
        </View>
      </View>
    </>
  );
}
