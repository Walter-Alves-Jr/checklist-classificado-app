import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useBrand } from "@/src/theme/useBrand";
import { TextInputProps } from "react-native";
import AppText from "../../Text/text";
import { useInput } from "../useInput";

interface AppInputLabelProps extends TextInputProps {
  hasIconLeft?: boolean;
}

export default function AppInputLabel({
  style,
  className,
  children,
  hasIconLeft,
  ...rest
}: AppInputLabelProps) {
  const { text } = useBrand();
  const { isFocused, value } = useInput();
  const hasValue = !!value;

  return (
    <AppText
      {...rest}
      pointerEvents="none"
      className={cn(
        "absolute left-0 outline-2 transition-all",
        isFocused || hasValue
          ? "-top-[1.875rem] text-sm"
          : "top-1 text-sm text-gray-400",
        // Validação para recuar um pouco a label para o início do campo, quando houver ícone, foco e valor no campo, deixando ambos centralizados visualmente
        hasIconLeft && (isFocused || hasValue) ? "-left-6" : "",
      )}
      style={{
        color: isFocused ? text.grayDark.color : "",
      }}
    >
      {children}
    </AppText>
  );
}
