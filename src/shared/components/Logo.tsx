import { useBrand } from "@/src/theme/useBrand";
import { Image } from "react-native";

export function Logo() {
  const { logo } = useBrand();

  if (!logo) return null;

  return <Image source={{ uri: logo }} style={{ width: 200, height: 200 }} />;
}
