import { useState } from "react";
import { View } from "react-native";
import { AppDropdownContext } from "./app-dropdown-context";
import { DropdownOption } from "./app-dropdown-list";

type DropdownRootProps<T> = {
  value: DropdownOption<T>;
  children: React.ReactNode;
  onChange: (v: DropdownOption<T>) => void;
};

export default function DropdownContextProvider({
  value,
  children,
  onChange,
}: DropdownRootProps<any>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <AppDropdownContext.Provider
      value={{
        open,
        value,
        search,
        setOpen,
        onChange,
        setSearch,
      }}
    >
      <View style={{ position: "relative" }}>{children}</View>
    </AppDropdownContext.Provider>
  );
}
