import { View } from "react-native";
import { Dropdown } from "./components";
import { DropdownOption } from "./components/app-dropdown-list";

type AppDropdownProps<T> = {
  value: T;
  setValue: React.Dispatch<T>;
  options: DropdownOption<T>[];
  placeholder?: string;
};

export default function AppDropdown({
  value,
  setValue,
  options,
  placeholder = "Selecionar...",
}: AppDropdownProps<any>) {
  return (
    <View className="p-4">
      <Dropdown value={value} onChange={setValue}>
        <Dropdown.Trigger placeholder={placeholder} />

        <Dropdown.Content>
          <Dropdown.Search />
          <Dropdown.List options={options} />
        </Dropdown.Content>
      </Dropdown>
    </View>
  );
}
