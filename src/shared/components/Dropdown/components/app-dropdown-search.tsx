import { palette } from "@/src/shared/consts/app-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";
import { AppTextInput } from "../../TextInput/AppTextInput";
import { useSelect } from "./app-dropdown-context";

export default function AppDropdownSearch() {
  const { search, setSearch } = useSelect();

  return (
    <View
      style={{
        padding: 10,
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <AppTextInput
        value={search}
        label=""
        placeholder="Buscar..."
        onChangeText={setSearch}
        style={{ paddingBottom: 7, paddingTop: 7 }}
        leftIcon={
          <MaterialIcons name="search" size={24} color={palette.grayDark} />
        }
      />
    </View>
  );
}
