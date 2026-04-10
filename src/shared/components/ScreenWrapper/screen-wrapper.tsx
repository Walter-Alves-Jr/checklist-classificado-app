import { ScrollViewProps, View } from "react-native";

export default function ScreenWrapper({ children, ...rest }: ScrollViewProps) {
  return (
    <View {...rest} className="w-full flex-1 p-4">
      {children}
    </View>
  );
}
