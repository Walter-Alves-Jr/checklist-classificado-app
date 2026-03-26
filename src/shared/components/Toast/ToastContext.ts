import { createContext, useContext } from "react";
import { ToastType } from "./types/ToastType";

export type ToastData = {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  action?: {
    label: string;
    onPress: () => void;
  };
};

type ToastContextType = {
  show: (toast: Omit<ToastData, "id">) => void;
};

export const ToastContext = createContext({} as ToastContextType);

export function useToast() {
  return useContext(ToastContext);
}
