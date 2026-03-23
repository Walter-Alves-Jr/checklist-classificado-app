import { useAuth } from "@/src/auth/AuthProvider";
import AppText from "@/src/shared/components/Text/text";
import { Touchable } from "@/src/shared/components/Touchable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, TextInput, View } from "react-native";
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
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="mb-6 flex items-center justify-center">
        <AppText className="absolute bottom-4 text-center text-4xl font-bold text-[#ff3e04]">
          checklist
        </AppText>
        <Image
          source={{
            uri: "https://institucional.nstech.com.br/core/webp-express/webp-images/themes/theme-wp/src/assets/images/logos/nstech.png.webp",
          }}
          className="h-32 w-32"
          resizeMode="contain"
        />
      </View>

      <Controller
        control={control}
        rules={{ required: "Login é obrigatório" }}
        name="username"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View className="mb-4 w-full">
            <TextInput
              placeholder="Login"
              value={value}
              onChangeText={onChange}
              className="rounded-lg border border-gray-300 p-4 outline-1 outline-orange-500"
              {...register("username")}
            />
            {error && (
              <AppText className="mt-1 text-sm text-red-500">
                {error.message}
              </AppText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "Senha é obrigatória" }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View className="mb-6 w-full">
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              className="rounded-lg border border-gray-300 p-4 outline-1 outline-orange-500"
              {...register("password")}
            />
            {error && (
              <AppText className="mt-1 text-sm text-red-500">
                {error.message}
              </AppText>
            )}
          </View>
        )}
      />

      <Touchable.Container
        onPress={handleSubmit(handleLogin)}
        className="w-full items-center rounded-lg bg-orange-500"
      >
        <Touchable.Content className="text-lg font-bold text-white">
          Entrar
        </Touchable.Content>
      </Touchable.Container>
    </View>
  );
}
