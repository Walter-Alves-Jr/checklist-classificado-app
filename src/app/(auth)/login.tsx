import { useAuth } from "@/src/auth/AuthProvider";
import AppText from "@/src/shared/components/Text/AppText";
import { AppTextInput } from "@/src/shared/components/TextInput/AppTextInput";
import { Touchable } from "@/src/shared/components/Touchable";
import { app_colors } from "@/src/shared/consts";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Informe seu login."),
  password: z.string().min(1, "Informe sua senha."),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const { handleSubmit, control } = useForm<LoginSchema>({
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
          source={require("@/src/assets/images/logo-nstech.png")}
          resizeMode="contain"
          style={{ width: 68, height: 68 }}
        />
        <View className="-mt-2">
          <AppText
            style={{ color: app_colors.text.tertiary }}
            className="text-7xl font-bold"
          >
            yard
          </AppText>

          <AppText
            style={{ color: app_colors.text.secondary }}
            className="-mt-4 ml-6 bg-transparent text-3xl font-bold"
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
            <View className="mb-3">
              <AppTextInput
                label="Login"
                value={value}
                onChangeText={onChange}
                error={error}
                leftIcon={<Feather name="user" size={20} />}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatória" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <AppTextInput
              label="Senha"
              value={value}
              onChangeText={onChange}
              error={error}
              leftIcon={<AntDesign name="lock" size={20} />}
              rightIcon={<AntDesign name="eye-invisible" size={20} />}
              isPassword
            />
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
