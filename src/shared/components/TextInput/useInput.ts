import { createContext, useContext } from "react";
import { FieldError } from "react-hook-form";

type InputContextType = {
  isFocused: boolean;
  setIsFocused: (v: boolean) => void;
  value?: string;
  error?: FieldError;
};

const InputContext = createContext<InputContextType | null>(null);

export function useInput() {
  const context = useContext(InputContext);
  if (!context) throw new Error("Use dentro de app-input-root.tsx");
  return context;
}

export default InputContext;
