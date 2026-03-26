import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { TextProps } from "react-native";
import AppText from "../Text/AppText";

export function AppButtonText({ children, className, ...rest }: TextProps) {
  return (
    <AppText {...rest} className={cn("leading-none", className)}>
      {children}
    </AppText>
  );
}
