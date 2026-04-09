import { createContext, useContext } from "react";
import { DropdownOption } from "./app-dropdown-list";

type DropdownContextContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;

  value: {
    value: string | number;
    label: string;
  } | null;
  onChange: (value: DropdownOption) => void;

  search?: string;
  setSearch?: (value: string) => void;
};

export const AppDropdownContext =
  createContext<DropdownContextContextType | null>(null);

export function useSelect() {
  const ctx = useContext(AppDropdownContext);

  if (!ctx) {
    throw new Error(
      "O componente deve ser utilizado dentro de DropdownContextProvider.",
    );
  }

  return ctx as DropdownContextContextType;
}
