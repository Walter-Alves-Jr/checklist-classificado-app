import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="armazens" />
      <Stack.Screen name="situacoes" />
      <Stack.Screen name="classificador" />
    </Stack>
  );
}
