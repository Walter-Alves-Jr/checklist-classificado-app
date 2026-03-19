import { useTwTheme } from "@/src/theme/useTwTheme";
import { Text, TextProps } from "react-native";

interface TouchableContentProps extends TextProps {
  children: React.ReactNode;
}

export default function TouchableContent(props: TouchableContentProps) {
  const tw = useTwTheme();
  const { style, className, children, ...rest } = props;

  return (
    <Text
      {...rest}
      style={[tw.textPrimary, style]}
      className={`text-white font-bold ${className}`}
    >
      {children}
    </Text>
  );
}
