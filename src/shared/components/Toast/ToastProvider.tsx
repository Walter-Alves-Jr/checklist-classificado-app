import { useState } from "react";
import { View } from "react-native";
import { ToastContext, ToastData } from "./ToastContext";
import { ToastItem } from "./ToastItem";

type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  function show(toast: Omit<ToastData, "id">) {
    const id = String(Date.now());
    setToasts((prev) => [...prev, { ...toast, id }]);
  }

  function remove(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <View className="absolute left-0 right-0 top-12 px-4">
        {toasts.map((toast) => {
          return (
            <ToastItem
              key={toast.id}
              id={toast.id}
              title={toast.title}
              description={toast.description}
              type={toast.type}
              action={toast.action}
              onRemove={remove}
            />
          );
        })}
      </View>
    </ToastContext.Provider>
  );
}
