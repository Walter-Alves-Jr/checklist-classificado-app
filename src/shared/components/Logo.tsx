import { useBrand } from "@/src/theme/useBrand";
import { Avatar } from "react-native-paper";

export function Logo() {
  const { logo } = useBrand();

  if (!logo) return null;

  return (
    <Avatar.Image
      size={40}
      source={require("@/src/assets/images/webler.png")}
    />
  );
}
