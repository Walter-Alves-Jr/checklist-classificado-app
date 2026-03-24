import { useState } from "react";
import { FieldError } from "react-hook-form";
import { View } from "react-native";
import InputContext from "../useInput";

interface AppInputRootProps {
  children: React.ReactNode;
  error?: FieldError;
  value?: string;
}

export function AppInputRoot({ children, error, value }: AppInputRootProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContext.Provider value={{ isFocused, setIsFocused, error, value }}>
      <View className="mb-4 w-full">{children}</View>
    </InputContext.Provider>
  );
}
