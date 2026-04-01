import { TextInput, View } from "react-native";
import { useSelect } from "./app-dropdown-context";

export default function AppDropdownSearch() {
  const { search, setSearch } = useSelect();

  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#eee" }}>
      <TextInput
        placeholder="Buscar..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#f1f1f1",
          padding: 10,
          borderRadius: 8,
        }}
      />
    </View>
  );
}
