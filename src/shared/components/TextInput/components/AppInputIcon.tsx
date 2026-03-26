import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { TouchableOpacityProps, View } from "react-native";
import { AppButton } from "../../Button";

interface AppInputIconProps extends TouchableOpacityProps {
  isButton?: boolean;
  onPress?(): void;
}

export function AppInputIcon({
  children,
  className,
  isButton,
  onPress,
  ...rest
}: AppInputIconProps) {
  return (
    <View>
      {isButton ? (
        <AppButton
          onPress={onPress}
          className={cn("p-0", className)}
          style={{ backgroundColor: "transparent" }}
          {...rest}
        >
          <AppButton.Icon className={cn("ml-2 color-[#242424]", className)}>
            {children}
          </AppButton.Icon>
        </AppButton>
      ) : (
        <AppButton.Icon
          {...rest}
          className={cn("mr-2 color-[#242424]", className)}
        >
          {children}
        </AppButton.Icon>
      )}
    </View>
  );
}
