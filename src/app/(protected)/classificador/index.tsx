import { generateClassificationPDF } from "@/src/features/classificador/services/classificadorService";
import { registerClassificationLocalStorage } from "@/src/localStorage/services/localStorageService";
import { AppButton } from "@/src/shared/components/Button";
import AppContainer from "@/src/shared/components/Container/container";
import HeaderPage from "@/src/shared/components/Header/header-page";
import AppText from "@/src/shared/components/Text/text";
import { AppTextInput } from "@/src/shared/components/TextInput/app-text-input";
import { sendWebhookYMS } from "@/src/shared/services/webHookYMSService";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Classificador() {
  const [agendamento, setAgendamento] = useState("");
  const [placa, setPlaca] = useState("");
  const [motorista, setMotorista] = useState("");
  const [transportadora, setTransportadora] = useState("");

  const [produto, setProduto] = useState("");
  const [terminal, setTerminal] = useState("");

  const [cultura, setCultura] = useState("Soja");

  const [umidade, setUmidade] = useState("");
  const [impureza, setImpureza] = useState("");
  const [ardidos, setArdidos] = useState("");
  const [mofados, setMofados] = useState("");
  const [germinados, setGerminados] = useState("");

  const calcularResultado = () => {
    let resultado = "TIPO 1";

    if (cultura === "Soja") {
      if (Number(impureza) > 1 || Number(ardidos) > 4 || Number(mofados) > 6) {
        resultado = "TIPO 2";
      }

      if (Number(impureza) > 2 || Number(ardidos) > 8 || Number(mofados) > 12) {
        resultado = "FORA DE TIPO";
      }
    }

    if (cultura === "Milho") {
      if (Number(impureza) > 1) {
        resultado = "TIPO 2";
      }

      if (Number(impureza) > 3) {
        resultado = "FORA DE TIPO";
      }
    }

    if (cultura === "Trigo") {
      if (Number(impureza) > 1) {
        resultado = "TIPO 2";
      }

      if (Number(impureza) > 2) {
        resultado = "FORA DE TIPO";
      }
    }

    return resultado;
  };

  const classificar = async () => {
    const resultado = calcularResultado();

    const dados = {
      agendamento,
      placa,
      motorista,
      transportadora,
      produto,
      terminal,
      cultura,
      umidade: Number(umidade),
      impureza: Number(impureza),
      ardidos: Number(ardidos),
      mofados: Number(mofados),
      germinados: Number(germinados),
      resultado,
      status: "REALIZADA" as const,
      data: new Date().toISOString(),
    };

    await registerClassificationLocalStorage(dados);

    await sendWebhookYMS({
      tipo: "classificacao",
      dados,
    });

    generateClassificationPDF(dados);

    alert("Classificação registrada");

    router.back();
  };

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage title="Classificador de Grãos" goBack={goBack} />
      <AppContainer>
        <View>
          <AppText variant="grayDark">Agendamento*</AppText>
          <AppTextInput
            label="Número do agendamento"
            value={agendamento}
            onChangeText={setAgendamento}
          />
        </View>

        <View className="mb-5 mt-5">
          <AppText variant="grayDark" className="mb-6 text-base">
            Informações para transporte
          </AppText>

          <View className="flex flex-col gap-3">
            <View>
              <AppTextInput
                label="Placa do veículo"
                value={placa}
                onChangeText={setPlaca}
              />
            </View>

            <View>
              <AppTextInput
                label="Nome do Motorista"
                value={motorista}
                onChangeText={setMotorista}
              />
            </View>

            <View>
              <AppTextInput
                label="Nome da Transportadora"
                value={transportadora}
                onChangeText={setTransportadora}
              />
            </View>

            <View>
              <AppTextInput
                label="Nome do Produto"
                value={produto}
                onChangeText={setProduto}
              />
            </View>

            <View>
              <AppTextInput
                label="Informe o Terminal"
                value={terminal}
                onChangeText={setTerminal}
              />
            </View>
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
              <Picker
                selectedValue={cultura}
                onValueChange={(v) => setCultura(v)}
              >
                <Picker.Item label="Soja" value="Soja" />
                <Picker.Item label="Milho" value="Milho" />
                <Picker.Item label="Trigo" value="Trigo" />
              </Picker>
            </View>

            <View>
              <AppTextInput
                label="Umidade (%)"
                value={umidade}
                onChangeText={setUmidade}
              />
            </View>

            <View>
              <AppTextInput
                label="Impureza (%)"
                value={impureza}
                onChangeText={setImpureza}
              />
            </View>

            <View>
              <AppTextInput
                label="Ardidos (%)"
                value={ardidos}
                onChangeText={setArdidos}
              />
            </View>

            <View>
              <AppTextInput
                label="Mofados (%)"
                value={mofados}
                onChangeText={setMofados}
              />
            </View>

            <View>
              <AppTextInput
                label="Germinados (%)"
                value={germinados}
                onChangeText={setGerminados}
              />
            </View>
          </View>
        </View>

        <AppButton
          onPress={classificar}
          className="flex items-center justify-center"
        >
          <AppButton.Text className="text-base font-bold">
            Classificar
          </AppButton.Text>
        </AppButton>
      </AppContainer>
    </>
  );
}
