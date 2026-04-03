import { View } from "react-native";

import { AppMenuOptions, AppRatings } from "@/src/features/home/components";
import { useBrand } from "@/src/theme/useBrand";

export default function AppHome() {
  const brand = useBrand();

  return (
    <>
      <View className="rounded-b-3xl p-4" style={brand.background.primary}>
        <AppRatings />
      </View>

      <AppMenuOptions />
    </>
  );
}
