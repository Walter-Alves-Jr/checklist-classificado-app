import { registerClassificationLocalStorage } from "@/src/localStorage/services/localStorageService";
import { AppButton } from "@/src/shared/components/Button";
import AppContainer from "@/src/shared/components/Container/container";
import HeaderPage from "@/src/shared/components/Header/header-page";
import AppText from "@/src/shared/components/Text/text";
import { AppTextInput } from "@/src/shared/components/TextInput/app-text-input";
import { maskPlaca } from "@/src/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import {
  classificarMAPA,
  generateClassificationPDF,
} from "./services/classificadorService";
import { IClassificacaoResponse } from "./types/IClassificacao";

// todo: Refatorar componente e separar responsabilidades

const classifierSchema = z.object({
  numeroAgendamento: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe um número de agendamento."),

  placa: z
    .string()
    .min(1, "Placa do veículo é obrigatório.")
    .transform((val) => val.replace(/-/g, ""))
    .refine(
      (val) => /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(val),
      "A placa informada não segue o padrão: AAA1A11",
    ),
  motorista: z.string().min(1, "Motorista é obrigatório."),
  transportadora: z.string().min(1, "Transportadora é obrigatório."),
  produto: z.string().min(1, "Produto é obrigatório."),
  terminal: z.string().min(1, "Terminal é obrigatório."),
  cultura: z.enum(["soja", "milho", "trigo"]),

  umidade: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe umidade.")
    .max(100, "Informe um número entre 0 e 100."),
  impureza: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe impureza.")
    .max(100, "Informe um número entre 0 e 100."),
  ardidos: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe ardidos.")
    .max(100, "Informe um número entre 0 e 100."),
  mofados: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe mofados.")
    .max(100, "Informe um número entre 0 e 100."),
  germinados: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe germinados.")
    .max(100, "Informe um número entre 0 e 100."),
  quebrados: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe quebrados.")
    .max(100, "Informe um número entre 0 e 100."),
  pesoHectolitro: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe Peso hectolitro.")
    .max(100, "Informe um número entre 0 e 100."),
});

type FormInput = z.input<typeof classifierSchema>;
type FormOutput = z.output<typeof classifierSchema>;

export default function Classificador() {
  const { handleSubmit, control } = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(classifierSchema),
    defaultValues: {
      numeroAgendamento: "",
      placa: "",
      motorista: "",
      transportadora: "",
      produto: "",
      terminal: "",
      cultura: "soja",
      umidade: "",
      impureza: "",
      ardidos: "",
      mofados: "",
      germinados: "",
      quebrados: "",
      pesoHectolitro: "",
    },
  });

  function onSubmit(data: FormOutput) {
    const {
      cultura,
      umidade,
      impureza,
      ardidos,
      mofados,
      germinados,
      pesoHectolitro,
      quebrados,
    } = data;

    const resultado = classificarMAPA({
      cultura,
      umidade,
      impureza,
      ardidos,
      mofados,
      germinados,
      quebrados,
      pesoHectolitro,
    });

    const dados: IClassificacaoResponse = { resultado, ...data };

    registerClassificationLocalStorage(dados);
    generateClassificationPDF(dados);
  }

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage title="Classificador de Grãos" goBack={goBack} />
      <AppContainer>
        <View className="mt-4">
          <Controller
            control={control}
            name="numeroAgendamento"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <View>
                <AppTextInput
                  label="Número agendamento"
                  value={value}
                  onChangeText={onChange}
                  error={error}
                />
              </View>
            )}
          />
        </View>

        <View className="mb-5 mt-5">
          <AppText variant="grayDark" className="mb-6 text-base">
            Informações para transporte
          </AppText>

          <View className="flex flex-col gap-3">
            <Controller
              disabled
              control={control}
              name="placa"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label="Placa do veículo"
                  value={value}
                  onChangeText={onChange}
                  error={error}
                  mask={maskPlaca}
                />
              )}
            />

            <Controller
              control={control}
              name="motorista"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label="Motorista"
                  value={value}
                  onChangeText={onChange}
                  error={error}
                />
              )}
            />

            <Controller
              control={control}
              name="transportadora"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label="Transportadora"
                  value={value}
                  onChangeText={onChange}
                  error={error}
                />
              )}
            />

            <Controller
              control={control}
              name="produto"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label="Produto"
                  value={value}
                  onChangeText={onChange}
                  error={error}
                />
              )}
            />

            <Controller
              control={control}
              name="terminal"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <AppTextInput
                  label="Terminal"
                  value={value}
                  onChangeText={onChange}
                  error={error}
                />
              )}
            />
          </View>
        </View>

        <View>
          <AppText variant="grayDark" className="text-base">
            Informações do grão
          </AppText>

          <View className="mb-10 flex flex-col gap-3">
            <View className="my-4">
              <AppText variant="grayDark" className="font-normal">
                Selecione o grão
              </AppText>

              <Controller
                control={control}
                name="cultura"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <View>
                    <Picker
                      selectedValue={value}
                      onValueChange={(v) => onChange(v)}
                    >
                      <Picker.Item label="Soja" value="soja" />
                      <Picker.Item label="Milho" value="milho" />
                      <Picker.Item label="Trigo" value="trigo" />
                    </Picker>

                    {error && (
                      <Text style={{ color: "red" }}>{error.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            <Controller
              control={control}
              name="umidade"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Umidade (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="impureza"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Impureza (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="ardidos"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Ardidos (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="mofados"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Mofados (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="germinados"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Germinados (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="quebrados"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Quebrados (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="pesoHectolitro"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <AppTextInput
                    label="Peso Hectolitro (%)"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                </View>
              )}
            />
          </View>
        </View>

        <AppButton
          onPress={handleSubmit(onSubmit)}
          className="mb-8 flex items-center justify-center"
        >
          <AppButton.Text className="text-base font-bold">
            Classificar
          </AppButton.Text>
        </AppButton>
      </AppContainer>
    </>
  );
}
