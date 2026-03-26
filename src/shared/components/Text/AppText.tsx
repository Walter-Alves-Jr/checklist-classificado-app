import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useBrand } from "@/src/theme/useBrand";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  variant?: "grayLight" | "grayDark" | "orange";
}

export default function AppText({
  children,
  className,
  style,
  variant = "grayLight",
  ...rest
}: AppTextProps) {
  const brand = useBrand();

  const variants = {
    grayLight: {
      color: brand.text.grayLight.color,
    },
    grayDark: {
      color: brand.text.grayDark.color,
    },
    orange: {
      color: brand.text.orange.color,
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
