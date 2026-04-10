import { registerClassificationLocalStorage } from "@/src/localStorage/services/localStorageService";
import { AppButton } from "@/src/shared/components/Button";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper/screen-wrapper";
import AppText from "@/src/shared/components/Text/AppText";
import { AppTextInput } from "@/src/shared/components/TextInput/AppTextInput";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { maskPlaca } from "@/src/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { useAgendamentoQuery } from "./hooks/storage/queries/use-agendamento-query";
import {
  classificarMAPA,
  generateClassificationPDF,
} from "./services/classificador-service";
import { ResultadoClassificacao } from "./types/classificacao-response.type";
import { IClassificacaoResponse } from "./types/classificacao.type";

// todo: Refatorar componente e separar responsabilidades

const classifierSchema = z.object({
  numeroAgendamento: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .min(1, "Informe um número de agendamento."),

  placaVeiculo: z
    .string()
    .min(1, "Placa do veículo é obrigatório.")
    .transform((val) => val.replace(/-/g, ""))
    .refine(
      (val) => /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(val),
      "A placa informada não segue o padrão: AAA1A11",
    ),
  motorista: z.string().min(1, "Motorista é obrigatório."),
  transportadora: z.string(),
  produto: z.string().min(1, "Produto é obrigatório."),
  terminal: z.string().min(1, "Terminal é obrigatório."),

  cultura: z.enum(["soja", "milho", "trigo"]),
  umidade: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
  impureza: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
  ardidos: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
  mofados: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
  germinados: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
  quebrados: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
  pesoHectolitro: z.coerce
    .number<string>({ error: "Informe apenas números." })
    .optional(),
});

// umidade: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe umidade.")
//   .max(100, "Informe um número entre 0 e 100."),
// impureza: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe impureza.")
//   .max(100, "Informe um número entre 0 e 100."),
// ardidos: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe ardidos.")
//   .max(100, "Informe um número entre 0 e 100."),
// mofados: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe mofados.")
//   .max(100, "Informe um número entre 0 e 100."),
// germinados: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe germinados.")
//   .max(100, "Informe um número entre 0 e 100."),
// quebrados: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe quebrados.")
//   .max(100, "Informe um número entre 0 e 100."),
// pesoHectolitro: z.coerce
//   .number<string>({ error: "Informe apenas números." })
//   .min(1, "Informe Peso hectolitro.")
//   .max(100, "Informe um número entre 0 e 100."),

type FormInput = z.input<typeof classifierSchema>;
type FormOutput = z.output<typeof classifierSchema>;

export default function AppClassificador() {
  const { handleSubmit, watch, reset, getValues, control } = useForm<
    FormInput,
    any,
    FormOutput
  >({
    resolver: zodResolver(classifierSchema),
    defaultValues: {
      numeroAgendamento: "",
      placaVeiculo: "",
      motorista: "",
      transportadora: "",
      produto: "",
      terminal: "",
      cultura: "trigo",
      umidade: "",
      impureza: "",
      ardidos: "",
      mofados: "",
      germinados: "",
      quebrados: "",
      pesoHectolitro: "",
    },
  });

  const { cultura } = watch();

  function onSubmit(data: FormOutput) {
    let resultadoClassificacao = {} as ResultadoClassificacao | undefined;

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

    if (cultura === "soja") {
      resultadoClassificacao = classificarMAPA({
        cultura,
        ardidos,
        mofados,
        germinados,
        umidade,
        impureza,
      });
    }

    if (cultura === "milho") {
      resultadoClassificacao = classificarMAPA({
        cultura,
        umidade,
        impureza,
        quebrados,
      });
    }

    if (cultura === "trigo") {
      resultadoClassificacao = classificarMAPA({
        cultura,
        pesoHectolitro,
      });
    }

    if (!resultadoClassificacao) return;

    const dados: IClassificacaoResponse = {
      resultado: resultadoClassificacao,
      ...data,
    };

    registerClassificationLocalStorage(dados);
    generateClassificationPDF(dados);
  }

  const numeroAgendamento = watch("numeroAgendamento");
  const debouncedNumeroAgendamento = useDebounce(numeroAgendamento, 700);
  const { data } = useAgendamentoQuery(Number(debouncedNumeroAgendamento));

  useEffect(() => {
    if (!data) {
      reset({
        ...getValues(),
        placaVeiculo: "",
        motorista: "",
        transportadora: "",
        produto: "",
        terminal: "",
      });
      return;
    }

    const { veiculo, motorista, fornecedor, produto } = data;

    reset({
      ...getValues(),
      placaVeiculo: veiculo.placa,
      motorista: motorista.nome,
      transportadora: "",
      produto: produto.denominacao,
      terminal: fornecedor.razaoSocial,
    });
  }, [data, getValues, reset]);

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage title="Classificador de Grãos" goBack={goBack} />
      <ScrollView>
        <ScreenWrapper>
          <SafeAreaView>
            <View className="mt-1">
              <Controller
                control={control}
                name="numeroAgendamento"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <AppTextInput
                    label="Número agendamento"
                    value={value}
                    onChangeText={onChange}
                    error={error}
                  />
                )}
              />
            </View>

            <View className="mb-5 mt-5">
              <AppText variant="secondary" className="mb-6 text-base">
                Informações para transporte
              </AppText>

              <View className="flex flex-col gap-3">
                <Controller
                  disabled
                  control={control}
                  name="placaVeiculo"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <AppTextInput
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
              <AppText variant="secondary" className="text-base">
                Informações do grão
              </AppText>

              <View className="mb-10 flex flex-col gap-3">
                <View className="my-4">
                  <AppText variant="secondary" className="font-normal">
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
                          style={{ color: "#242424" }}
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

                {(cultura === "milho" || cultura === "soja") && (
                  <>
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
                            value={value ?? ""}
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
                            value={value ?? ""}
                            onChangeText={onChange}
                            error={error}
                          />
                        </View>
                      )}
                    />
                  </>
                )}

                {cultura === "milho" && (
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
                          value={value ?? ""}
                          onChangeText={onChange}
                          error={error}
                        />
                      </View>
                    )}
                  />
                )}

                {cultura === "soja" && (
                  <>
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
                            value={value ?? ""}
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
                            value={value ?? ""}
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
                            value={value ?? ""}
                            onChangeText={onChange}
                            error={error}
                          />
                        </View>
                      )}
                    />
                  </>
                )}

                {cultura === "trigo" && (
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
                          value={value ?? ""}
                          onChangeText={onChange}
                          error={error}
                        />
                      </View>
                    )}
                  />
                )}
              </View>
            </View>

            <AppButton
              onPress={handleSubmit(onSubmit)}
              className="mb-20 flex items-center justify-center"
            >
              <AppButton.Text className="text-base font-bold">
                Classificar
              </AppButton.Text>
            </AppButton>
          </SafeAreaView>
        </ScreenWrapper>
      </ScrollView>
    </>
  );
}
