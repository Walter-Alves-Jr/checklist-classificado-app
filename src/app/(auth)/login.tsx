import { useAuth } from "@/src/auth/AuthProvider";
import AppText from "@/src/shared/components/Text/text";
import { Touchable } from "@/src/shared/components/Touchable";
import { app_colors } from "@/src/shared/consts";
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
    <View className="flex-1 items-center justify-center">
      <View className="mb-10 flex flex-row items-center gap-0.5">
        <Image
          source={require("../../assets/logo-nstech.webp")}
          resizeMode="contain"
          style={{ width: 68, height: 68 }}
        />
        <View>
          <AppText
            style={{ color: app_colors.text.tertiary }}
            className="text-7xl font-bold leading-10"
          >
            yard
          </AppText>

          <AppText
            style={{ color: app_colors.text.secondary }}
            className="ml-6 mt-1 text-3xl font-bold"
          >
            checklist
          </AppText>
        </View>
      </View>
      <View className="w-full px-4">
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
                className="rounded-lg border border-gray-300 p-4 outline-1 outline-[#ff3e04]"
                {...register("username")}
              />
              {error && (
                <AppText className="mt-1 text-sm" variant="tertiary">
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
            <View className="w-full">
              <TextInput
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                className="rounded-lg border border-gray-300 p-4 outline-1 outline-[#ff3e04]"
                {...register("password")}
              />
              {error && (
                <AppText className="mt-1 text-sm" variant="tertiary">
                  {error.message}
                </AppText>
              )}
            </View>
          )}
        />
        <Touchable.Container
          onPress={handleSubmit(handleLogin)}
          className="mt-10 w-full items-center rounded-lg bg-[#ff3e04] outline-[#242424]"
        >
          <Touchable.Content className="text-lg font-bold">
            Entrar
          </Touchable.Content>
        </Touchable.Container>
      </View>
    </View>
  );
}
