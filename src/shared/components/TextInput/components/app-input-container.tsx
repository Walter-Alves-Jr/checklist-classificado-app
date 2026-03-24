import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useBrand } from "@/src/theme/useBrand";
import { View, ViewProps } from "react-native";
import { useInput } from "../useInput";

export default function AppInputContainer({
  children,
  className,
  ...rest
}: ViewProps) {
  const { isFocused, error } = useInput();
  const { background } = useBrand();
  return (
    <View
      {...rest}
      className={cn(
        "flex flex-row items-center rounded-lg border border-gray-300 px-3 py-2 outline-0",
        error?.message ? "border-red-500 bg-red-100" : "border-gray-300",
        className,
      )}
      style={[
        isFocused && {
          outlineWidth: 1,
          outlineColor: background.orange.backgroundColor,
          borderColor: background.orange.backgroundColor,
          outlineStyle: "solid",
        },
      ]}
    >
      {children}
    </View>
  );
}
