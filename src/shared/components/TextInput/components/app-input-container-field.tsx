import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { View, ViewProps } from "react-native";

export default function AppInputFieldContainer({
  children,
  className,
  ...rest
}: ViewProps) {
  return (
    <View className={cn("relative flex-1", className)} {...rest}>
      {children}
    </View>
  );
}
