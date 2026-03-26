import { FieldError } from "react-hook-form";
import { TextInputProps, View } from "react-native";
import { AppInput } from "./components";

interface FormInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: FieldError;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  mask?: (text: string) => string;
}

export function AppTextInput({
  label,
  value,
  error,
  leftIcon,
  rightIcon,
  isPassword,
  onChangeText,
  mask,
  ...rest
}: FormInputProps) {
  const hasIconLeft = leftIcon ? true : false;

  return (
    <AppInput.Root error={error} value={value}>
      <AppInput.Container>
        {leftIcon && <AppInput.Icon>{leftIcon}</AppInput.Icon>}

        <AppInput.FieldContainer>
          {/* hasLeftIcon passado para centralizar a label junto ao ícone, quando houver, somente ao focar no input e quando houver valor nele. */}
          <AppInput.Label hasIconLeft={hasIconLeft}>{label}</AppInput.Label>

          {mask ? (
            <View>
              <AppInput.Field
                value={value}
                onChangeText={(text) => {
                  onChangeText(mask(text));
                }}
                secureTextEntry={isPassword}
                {...rest}
              />
            </View>
          ) : (
            <AppInput.Field
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={isPassword}
              {...rest}
            />
          )}
        </AppInput.FieldContainer>

        {rightIcon && <AppInput.Icon isButton>{rightIcon}</AppInput.Icon>}
      </AppInput.Container>

      <View>
        <AppInput.Error error={error} />
      </View>
    </AppInput.Root>
  );
}
