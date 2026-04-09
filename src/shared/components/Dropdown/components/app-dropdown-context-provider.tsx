import { useState } from "react";
import { View } from "react-native";
import { AppDropdownContext } from "./app-dropdown-context";
import { DropdownOption } from "./app-dropdown-list";

type DropdownRootProps = {
  value: {
    value: string | number;
    label: string;
  } | null;
  children: React.ReactNode;
  onChange: (value: DropdownOption) => void;

  search?: string;
  onSearchChange?: (value: string) => void;
};

export default function DropdownContextProvider({
  value,
  children,
  search,
  onChange,
  onSearchChange,
}: DropdownRootProps) {
  const [open, setOpen] = useState(false);

  return (
    <AppDropdownContext.Provider
      value={{
        open,
        value,
        search,
        setOpen,
        onChange,
        setSearch: onSearchChange,
      }}
    >
      <View style={{ position: "relative" }}>{children}</View>
    </AppDropdownContext.Provider>
  );
}
