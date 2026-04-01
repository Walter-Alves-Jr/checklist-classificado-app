import { FlatList } from "react-native";
import { AppButton } from "../../Button";
import { useSelect } from "./app-dropdown-context";

export type DropdownOption<T> = {
  label: string;
  value: T;
};

export default function AppDropdownList({
  options,
}: {
  options: DropdownOption<any>[];
}) {
  const { search, onChange, setOpen, value } = useSelect();

  const filtered = options.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.label}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => {
        const selected = value?.value === item.value;

        return (
          <AppButton
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: selected ? "#eff6ff" : "#fff",
            }}
            onPress={() => {
              onChange(item);
              setOpen(false);
            }}
          >
            <AppButton.Text
              style={{
                color: "#242424",
                fontWeight: selected ? "bold" : "normal",
                fontSize: 16,
              }}
            >
              {item.label}
            </AppButton.Text>

            {selected && (
              <AppButton.Text
                style={{
                  color: selected ? "#2563eb" : "",
                }}
              >
                ✓
              </AppButton.Text>
            )}
          </AppButton>
        );
      }}
    />
  );
}
