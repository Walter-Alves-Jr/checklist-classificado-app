import { cn } from "@/src/lib/tailwind-merge/tailwind-merge";
import { useBrand } from "@/src/theme/useBrand";
import { TextInput, TextInputProps } from "react-native";
import { useInput } from "../useInput";

export function AppInputField({ className, style, ...rest }: TextInputProps) {
  const { setIsFocused, value } = useInput();
  const { text } = useBrand();

  return (
    <TextInput
      {...rest}
      value={value}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn("py-3 text-sm font-semibold outline-none", className)}
      style={[
        {
          color: text.grayDark.color,
        },
        style,
      ]}
    />
  );
}
