import { useMemo } from "react";
import { View } from "react-native";
import { Dropdown } from "./components";

type AppDropdownProps<T> = {
  value: string | number | null;
  data: T[];
  loading: boolean;
  onChange: (value: string | number) => void;
  options: (item: T) => {
    label: string;
    value: string | number;
  };
  disabled?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  placeholder?: string;
};

export default function AppDropdown<T>({
  placeholder = "Selecionar...",
  value,
  data,
  search,
  loading,
  disabled,
  filterable,
  options,
  onChange,
  onSearchChange,
}: AppDropdownProps<T>) {
  const mappedOptions = useMemo(() => {
    return data.map(options);
  }, [data, options]);

  const selectedOption = useMemo(() => {
    return mappedOptions.find((opt) => opt.value === value) || null;
  }, [mappedOptions, value]);

  return (
    <View className="p-4">
      <Dropdown
        value={selectedOption}
        onChange={(option) => onChange(option.value)}
        search={search}
        onSearchChange={onSearchChange}
      >
        <Dropdown.Trigger
          placeholder={placeholder}
          loading={loading}
          disabled={disabled}
        />

        <Dropdown.Content>
          {filterable ? <Dropdown.Search /> : <></>}
          <Dropdown.List options={mappedOptions} loading={loading} />
        </Dropdown.Content>
      </Dropdown>
    </View>
  );
}
