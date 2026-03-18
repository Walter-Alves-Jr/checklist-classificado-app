import { queryClient } from "@/src/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="armazens" />
        <Stack.Screen name="situacoes" />
        <Stack.Screen name="classificador" />
      </Stack>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
