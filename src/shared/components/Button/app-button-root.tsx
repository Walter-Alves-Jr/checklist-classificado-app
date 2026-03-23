import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useTwTheme } from "@/src/theme/useTwTheme";
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
  const tw = useTwTheme();

  return (
    <ButtonContext.Provider value={{ loading, disabled: isDisabled }}>
      <TouchableOpacity
        {...rest}
        className={cn(
          `flex flex-row items-center gap-1 rounded-xl p-3 text-left font-semibold${isDisabled ? "opacity-70" : ""}`,
          className,
        )}
        disabled={isDisabled}
        style={{
          backgroundColor:
            tw.bgPrimary && useTheme
              ? tw.bgPrimary.backgroundColor
              : tw.bgSecondary.backgroundColor,
        }}
      >
        {loading ? <ActivityIndicator /> : children}
      </TouchableOpacity>
    </ButtonContext.Provider>
  );
}
