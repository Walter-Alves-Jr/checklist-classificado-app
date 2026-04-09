import { palette } from "@/src/shared/consts/app-colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { AppButton } from "../../Button";
import AppText from "../../Text/AppText";
import { useSelect } from "./app-dropdown-context";

export type DropdownOption<T = any> = {
  label: string;
  value: string | number;
  raw?: T;
};

type AppDropdownListProps<T> = {
  options: DropdownOption<T>[];
  loading: boolean;
};

export default function AppDropdownList<T>({
  options,
  loading = true,
}: AppDropdownListProps<T>) {
  const { onChange, setOpen, value } = useSelect();

  const handleSelect = useCallback(
    (item: DropdownOption<T>) => {
      onChange(item);
      setOpen(false);
    },
    [onChange, setOpen],
  );

  const renderItem = useCallback(
    ({ item }: { item: DropdownOption<T> }) => {
      const selected = value?.value === item.value;

      return (
        <AppButton
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: selected ? "#eff6ff" : "#fff",
            padding: 15,
            marginTop: 2,
            borderRadius: 0,
          }}
          onPress={() => handleSelect(item)}
        >
          <AppButton.Text
            style={{
              color: palette.grayDark,
              fontWeight: selected ? "bold" : "normal",
              fontSize: 16,
            }}
          >
            {item.label}
          </AppButton.Text>

          {selected && (
            <AppButton.Icon>
              <AntDesign name="check" size={20} color={palette.success} />
            </AppButton.Icon>
          )}
        </AppButton>
      );
    },
    [value, handleSelect],
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ padding: 20 }} />
      ) : (
        <>
          {options.length > 0 ? (
            <FlatList
              initialNumToRender={10}
              windowSize={5}
              removeClippedSubviews
              data={options}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          ) : (
            <View className="flex items-center justify-center p-4">
              <MaterialIcons
                name="search-off"
                size={28}
                color={palette.grayDark}
              />
              <AppText variant="secondary">Nenhum registro encontrado.</AppText>
            </View>
          )}
        </>
      )}
    </>
  );
}
