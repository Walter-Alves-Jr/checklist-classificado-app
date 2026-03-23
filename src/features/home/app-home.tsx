import { View } from "react-native";

import {
  AppHomeHeader,
  AppMenuBottomOptions,
  AppMenuOptions,
  AppRatings,
} from "@/src/features/home/components";
import { useTwTheme } from "@/src/theme/useTwTheme";

export default function AppHome() {
  const tw = useTwTheme();

  return (
    <>
      <View className="rounded-b-3xl p-4" style={tw.bgPrimary}>
        <AppHomeHeader />
        <AppRatings />
      </View>

      <AppMenuOptions />

      <View className="absolute bottom-0 w-full">
        <AppMenuBottomOptions />
      </View>
    </>
  );
}
