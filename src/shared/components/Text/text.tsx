import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useTwTheme } from "@/src/theme/useTwTheme";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  variant?: "primary" | "secondary";
}

export default function AppText({
  children,
  className,
  style,
  variant = "primary",
  ...rest
}: AppTextProps) {
  const tw = useTwTheme();

  const variants = {
    primary: {
      color: tw.textPrimary.color,
    },
    secondary: {
      color: tw.textSecondary.color,
    },
  };

  return (
    <Text
      {...rest}
      style={[{ color: variants[variant].color }, style]}
      className={cn(`text-sm font-semibold`, className)}
    >
      {children}
    </Text>
  );
}
