import { useGetStorageNameQueryData } from "@/src/features/armazens/hooks/storage/queries/queryData/useGetStorageNameQueryData";
import { useChecklistResponse } from "@/src/features/checklists/hooks/mutations/useChecklistResponse";
import { useNomeChecklistQueryData } from "@/src/features/checklists/hooks/queries/data/use-nome-checklist-query-data";
import { usePerguntasChecklistQuery } from "@/src/features/perguntas/hooks/storage/queries/use-perguntas-checklist-query";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import AppText from "@/src/shared/components/Text/AppText";
import { useToast } from "@/src/shared/components/Toast";
import { Touchable } from "@/src/shared/components/Touchable";
import { app_colors } from "@/src/shared/consts";
import { useGps } from "@/src/shared/hooks/useGps";
import { useBrand } from "@/src/theme/useBrand";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function Checklist() {
  const { checklistId, armazemId } = useLocalSearchParams<{
    checklistId: string;
    armazemId: string;
  }>();

  const [respostas, setRespostas] = useState<Record<number, boolean>>({});

  const brand = useBrand();

  const {
    data: perguntasChecklist,
    isPending,
    isError,
  } = usePerguntasChecklistQuery(Number(checklistId));

  const { data: gpsResult } = useGps();

  const { mutateAsync, isPending: isPendingChecklistResponse } =
    useChecklistResponse();

  const { nomeChecklistSelecionado } = useNomeChecklistQueryData({
    checklistId: Number(checklistId),
    armazemId: Number(armazemId),
  });
  const { show } = useToast();

  const { storageName } = useGetStorageNameQueryData({
    armazemId: Number(armazemId),
  });

  function handleChange(perguntaId: number, value: string) {
    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: value === "true",
    }));
  }

  const salvar = async () => {
    if (!respostas || !nomeChecklistSelecionado || !storageName) return;

    if (!gpsResult?.coords)
      return alert("Informe sua localização para gerar o relatório!");

    const { latitude, longitude } = gpsResult?.coords;

    const dados = {
      checklistName: nomeChecklistSelecionado,
      armazemName: storageName,
      fotos: [],
      data: new Date().toISOString(),
      gps: `${latitude}, ${longitude}`,
      respostas,
    };

    await mutateAsync(dados);

    //todo: Refatorar e incluir endpoint
    // await sendWebhookYMS({
    //   tipo: "checklist",
    //   dados,
    // });

    goBack();
    show({ title: "Relatório gerado com sucesso!" });
  };

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage goBack={goBack} title="Lista de perguntas" />
      <AppContainer>
        {nomeChecklistSelecionado !== "" && (
          <AppText
            className="mb-3 text-2xl"
            style={{ color: app_colors.text.secondary }}
          >
            {nomeChecklistSelecionado}
          </AppText>
        )}

        {isPending && <Text>Loading...</Text>}
        {isError && <Text>Erro ao obter perguntas.</Text>}

        {perguntasChecklist?.map((item) => (
          <View key={item.id} style={{ marginBottom: 16 }}>
            <AppText
              className="mb-1 text-sm"
              style={{ color: app_colors.text.secondary }}
            >
              {item.pergunta}
            </AppText>

            <RadioButton.Group
              onValueChange={(value) => handleChange(item.id, value)}
              value={
                respostas[item.id] !== undefined
                  ? respostas[item.id].toString()
                  : ""
              }
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    value="true"
                    color={brand.background.primary.backgroundColor}
                  />
                  <Text>Sim</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    value="false"
                    color={brand.background.primary.backgroundColor}
                  />
                  <Text>Não</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        ))}

        <Touchable.Container onPress={salvar} className="mt-7">
          <Touchable.Content>
            {isPendingChecklistResponse
              ? "Finalizando..."
              : "Finalizar Checklist"}
          </Touchable.Content>
        </Touchable.Container>
      </AppContainer>
    </>
  );
}
