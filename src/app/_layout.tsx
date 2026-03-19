import { queryClient } from "@/src/lib/react-query";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Stack } from "expo-router";
import "./global.css";

export default function Layout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="armazens" />
          <Stack.Screen name="situacoes" />
          <Stack.Screen name="classificador" />
        </Stack>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
