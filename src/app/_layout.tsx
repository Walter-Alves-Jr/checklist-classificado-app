import { queryClient } from "@/src/lib/react-query";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Stack } from "expo-router";
import { AuthProvider } from "../auth/AuthProvider";
import { ToastProvider } from "../shared/components/Toast/ToastProvider";
import "./global.css";

// configurações de providers e temas globais

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
