import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useBrand } from "@/src/theme/useBrand";
import { createContext } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonContextType = {
  loading?: boolean;
  disabled?: boolean;
};

interface AppButtonRootProps extends TouchableOpacityProps {
  useTheme?: boolean;
}

const ButtonContext = createContext<ButtonContextType>({});

export function AppButtonRoot({
  children,
  loading,
  disabled,
  style,
  className,
  useTheme = true,
  ...rest
}: AppButtonRootProps & { loading?: boolean }) {
  const isDisabled = disabled || loading;
  const brand = useBrand();

  return (
    <ButtonContext.Provider value={{ loading, disabled: isDisabled }}>
      <TouchableOpacity
        {...rest}
        className={cn(
          `flex flex-row items-center gap-1 rounded-lg p-3.5 text-left font-semibold${isDisabled ? "opacity-70" : ""}`,
          className,
        )}
        disabled={isDisabled}
        style={[
          {
            backgroundColor:
              brand.background.orange && useTheme
                ? brand.background.orange.backgroundColor
                : brand.background.grayDark.backgroundColor,
          },
          style,
        ]}
      >
        {loading ? <ActivityIndicator /> : children}
      </TouchableOpacity>
    </ButtonContext.Provider>
  );
}
