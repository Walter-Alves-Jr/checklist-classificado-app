import { FieldError } from "react-hook-form";
import { View } from "react-native";
import { AppInput } from "./components";

interface FormInputProps {
  label: string;
  value: string;
  error?: FieldError;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}

export function AppTextInput({
  label,
  error,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  isPassword,
  ...rest //necessário para utilizar  {...register("campo") do hookform}
}: FormInputProps) {
  const hasIconLeft = leftIcon ? true : false;

  return (
    <AppInput.Root error={error} value={value}>
      <AppInput.Container>
        {leftIcon && <AppInput.Icon>{leftIcon}</AppInput.Icon>}

        <AppInput.FieldContainer>
          {/* hasLeftIcon passado para centralizar a label junto ao ícone, quando houver, somente ao focar no input e quando houver valor nele. */}
          <AppInput.Label hasIconLeft={hasIconLeft}>{label}</AppInput.Label>

          <AppInput.Field
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword}
            {...rest}
          />
        </AppInput.FieldContainer>

        {rightIcon && <AppInput.Icon isButton>{rightIcon}</AppInput.Icon>}
      </AppInput.Container>

      <View>
        <AppInput.Error error={error} />
      </View>
    </AppInput.Root>
  );
}
