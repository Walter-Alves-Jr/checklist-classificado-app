import { View } from "react-native";
import { useSelect } from "./app-dropdown-context";

export default function AppDropdownContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,

        marginTop: 6,
        zIndex: 999,

        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,

        backgroundColor: "#fff",
        elevation: 4,

        maxHeight: 250,
        overflow: "hidden",
      }}
    >
      {children}
    </View>
  );
}
