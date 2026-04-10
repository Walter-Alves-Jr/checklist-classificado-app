import { View } from "react-native";

// todo: refatorar para deixar dinâmico a quantidade
export const PerguntaSkeleton = () => (
  <View className="p-4">
    {[1, 2, 3].map((i) => (
      <View
        key={i}
        className="mb-6 h-20 w-full animate-pulse rounded-lg bg-gray-200"
      />
    ))}
  </View>
);
