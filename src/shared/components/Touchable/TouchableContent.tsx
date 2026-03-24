import { useBrand } from "@/src/theme/useBrand";
import { Text, TextProps } from "react-native";

interface TouchableContentProps extends TextProps {
  children: React.ReactNode;
}

export default function TouchableContent(props: TouchableContentProps) {
  const brand = useBrand();
  const { style, className, children, ...rest } = props;

  return (
    <Text
      {...rest}
      style={[brand.textPrimary, style]}
      className={`font-bold ${className}`}
    >
      {children}
    </Text>
  );
}
