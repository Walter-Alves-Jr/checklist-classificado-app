import { queryClient } from "@/src/lib/react-query";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../auth/AuthProvider";
import { ToastProvider } from "../shared/components/Toast/ToastProvider";
import "./global.css";

// configurações de providers e temas globais

// utilize <ReactQueryDevtools /> para debugar react-query,se rodar o sistema em versão web, não utilize para versões mobile, pois conflita.

export default function Layout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SQLiteProvider databaseName="nscheckdata.db">
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <AuthProvider>
                <ThemeProvider>
                  <Stack screenOptions={{ headerShown: false }} />
                </ThemeProvider>
              </AuthProvider>
            </ToastProvider>
          </QueryClientProvider>
        </SQLiteProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
