import { ToastType } from "./ToastType";

export type ToastProps = {
  id: string;
  title: string;
  onRemove: (id: string) => void;
  description?: string;
  type?: ToastType;
  action?: {
    label: string;
    onPress: () => void;
  };
};
