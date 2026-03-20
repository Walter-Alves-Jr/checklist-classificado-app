import { useAuth } from "@/src/auth/AuthProvider";
import { Touchable } from "@/src/shared/components/Touchable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, View } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Informe seu login."),
  password: z.string().min(1, "Informe sua senha."),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin({ username, password }: LoginSchema) {
    const user = await login({ username, password });
    if (!user) return alert("Usuário não encontrado!");

    router.replace("/");
  }

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <View className="flex items-center justify-center mb-6">
        <Text className="absolute bottom-2 text-[#ff3e04] font-bold text-4xl text-center">
          checklist
        </Text>
        <Image
          source={{
            uri: "https://institucional.nstech.com.br/core/webp-express/webp-images/themes/theme-wp/src/assets/images/logos/nstech.png.webp",
          }}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>

      <Controller
        control={control}
        rules={{ required: "Login é obrigatório" }}
        name="username"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View className="w-full mb-4">
            <TextInput
              placeholder="Login"
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-lg p-4 outline-1 outline-orange-500"
              {...register("username")}
            />
            {error && (
              <Text className="text-red-500 mt-1 text-sm">{error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "Senha é obrigatória" }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View className="w-full mb-6">
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-lg p-4 outline-1 outline-orange-500"
              {...register("password")}
            />
            {error && (
              <Text className="text-red-500 mt-1 text-sm">{error.message}</Text>
            )}
          </View>
        )}
      />

      <Touchable.Container
        onPress={handleSubmit(handleLogin)}
        className="w-full bg-orange-500 rounded-lg items-center"
      >
        <Touchable.Content className="text-white font-bold text-lg">
          Entrar
        </Touchable.Content>
      </Touchable.Container>
    </View>
  );
}
