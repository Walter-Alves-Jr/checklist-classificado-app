import { createContext, useContext } from "react";
import { DropdownOption } from "./app-dropdown-list";

type DropdownContextContextType<T> = {
  open: boolean;
  setOpen: (value: boolean) => void;

  value: DropdownOption<T>;
  onChange: (value: DropdownOption<T>) => void;

  search: string;
  setSearch: (value: string) => void;
};

export const AppDropdownContext =
  createContext<DropdownContextContextType<any> | null>(null);

export function useSelect() {
  const ctx = useContext(AppDropdownContext);

  if (!ctx) {
    throw new Error(
      "O componente deve ser utilizado dentro de DropdownContextProvider.",
    );
  }

  return ctx as DropdownContextContextType<any>;
}
