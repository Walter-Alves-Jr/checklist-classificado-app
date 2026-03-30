import { ScrollView, ScrollViewProps } from "react-native";

export default function AppContainer({ children, ...rest }: ScrollViewProps) {
  return (
    <ScrollView {...rest} className="w-full p-4">
      {children}
    </ScrollView>
  );
}
