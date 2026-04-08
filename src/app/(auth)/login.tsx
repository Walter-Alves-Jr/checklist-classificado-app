import { useAuthMutation } from "@/src/features/auth/hooks/storage/mutations/use-auth.mutation";
import { AppButton } from "@/src/shared/components/Button";
import AppText from "@/src/shared/components/Text/AppText";
import { AppTextInput } from "@/src/shared/components/TextInput/AppTextInput";
import { app_colors } from "@/src/shared/consts";
import { runMigrations } from "@/src/sqlite/create-database";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSQLiteContext } from "expo-sqlite";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, View } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  login: z.string().min(1, "Informe seu login."),
  senha: z.string().min(1, "Informe sua senha."),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { mutateAsync: authenticate, isPending } = useAuthMutation();

  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      senha: "",
    },
  });

  const db = useSQLiteContext();

  function handleRunMigrations() {
    Alert.alert(
      "Atenção",
      "Isso vai resetar todas as tabelas. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            await runMigrations(db);
          },
        },
      ],
    );
  }

  async function handleLogin({ login, senha }: LoginSchema) {
    try {
      await authenticate({
        login,
        senha,
      });
    } catch (err) {
      console.log("Erro:", err);
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-10 flex flex-row items-center gap-0.5">
        <Image
          source={require("@/src/assets/images/logonstech.png")}
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
            className="-mt-4 ml-5 bg-transparent text-[1.8rem] font-bold"
          >
            checklist
          </AppText>
        </View>
      </View>
      <View className="w-full px-4">
        <Controller
          control={control}
          rules={{ required: "Login é obrigatório" }}
          name="login"
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
          name="senha"
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
        <AppButton
          onPress={handleSubmit(handleLogin)}
          className="mt-4 flex items-center justify-center"
          loading={isPending}
          disabled={isPending}
        >
          <AppButton.Text className="text-lg font-bold">Entrar</AppButton.Text>
        </AppButton>
      </View>
      <View className="absolute bottom-24">
        <AppButton
          useTheme={false}
          onPress={handleRunMigrations}
          className="flex items-center justify-center"
        >
          <AppButton.Text>Resetar Tabelas</AppButton.Text>
        </AppButton>
      </View>
    </View>
  );
}
