import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useBrand } from "@/src/theme/useBrand";
import { Text, TextProps } from "react-native";
import { palette } from "../../consts/app-colors";

interface AppTextProps extends TextProps {
  variant?: "primary" | "secondary" | "tertiary" | "error";
}

export default function AppText({
  children,
  className,
  style,
  variant = "primary",
  ...rest
}: AppTextProps) {
  const brand = useBrand();

  const variants = {
    primary: {
      color: brand.text.primary.color,
    },
    secondary: {
      color: brand.text.secondary.color,
    },
    tertiary: {
      color: brand.text.tertiary.color,
    },
    error: {
      color: palette.error,
    },
  };

  return (
    <Text
      {...rest}
      style={[{ color: variants[variant].color }, style]}
      className={cn(`text-base font-semibold`, className)}
    >
      {children}
    </Text>
  );
}
