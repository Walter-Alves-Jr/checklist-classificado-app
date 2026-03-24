import { View } from "react-native";

import {
  AppHomeHeader,
  AppMenuBottomOptions,
  AppMenuOptions,
  AppRatings,
} from "@/src/features/home/components";
import { useBrand } from "@/src/theme/useBrand";

export default function AppHome() {
  const brand = useBrand();

  return (
    <>
      <View className="rounded-b-3xl p-4" style={brand.bgPrimary}>
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
