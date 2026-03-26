import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  children: ReactNode;
}

export function AppButtonIcon({ children, ...rest }: Props) {
  return <View {...rest}>{children}</View>;
}
