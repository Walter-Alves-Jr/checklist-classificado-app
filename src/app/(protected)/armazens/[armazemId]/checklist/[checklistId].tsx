import { useGetStorageNameQueryData } from "@/src/features/armazens/hooks/storage/queries/queryData/useGetStorageNameQueryData";
import { useChecklistResponse } from "@/src/features/checklist/hooks/mutations/useChecklistResponse";
import { useGetChecklistNameQueryData } from "@/src/features/checklist/hooks/queries/queryData/useGetChecklistNameQueryData";
import { useQuestionsChecklist } from "@/src/features/checklist/hooks/queries/useQuestionsChecklist";
import { Touchable } from "@/src/shared/components/Touchable";
import { useGps } from "@/src/shared/hooks/useGps";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Checklist() {
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({});
  const { checklistId, armazemId } = useLocalSearchParams<{
    checklistId: string;
    armazemId: string;
  }>();

  const {
    data: result,
    isPending,
    isError,
  } = useQuestionsChecklist({
    checklistId: Number(checklistId),
  });

  const { data: gpsResult } = useGps();

  const { mutateAsync, isPending: isPendingChecklistResponse } =
    useChecklistResponse();

  const { checklistNameByStorage } = useGetChecklistNameQueryData({
    checklistId: Number(checklistId),
    storageId: Number(armazemId),
  });

  const { storageName } = useGetStorageNameQueryData({
    armazemId: Number(armazemId),
  });

  function responder(pergunta: string, resposta: string) {
    setRespostas({
      ...respostas,
      [pergunta]: resposta,
    });
  }

  const salvar = async () => {
    if (!respostas || !checklistNameByStorage || !storageName) return;

    const dados = {
      checklistName: checklistNameByStorage,
      armazemName: storageName,
      fotos: [],
      data: new Date().toISOString(),
      gps: gpsResult?.toString() || "",
      respostas,
    };

    await mutateAsync(dados);

    //todo: Refatorar e incluir endpoint
    // await sendWebhookYMS({
    //   tipo: "checklist",
    //   dados,
    // });

    // alert("Checklist registrado"); todo: Inserir toast para mensagens.

    router.back(); //todo: back somente se for gerado com sucesso.
  };

  return (
    <View style={styles.container}>
      {checklistNameByStorage !== "" && (
        <Text className="text-2xl mb-6">{checklistNameByStorage}</Text>
      )}

      <Text className="text-lg mb-2">Lista de perguntas:</Text>

      {isPending && <Text>Loading...</Text>}
      {isError && <Text>Erro ao obter perguntas.</Text>}

      {result &&
        result.map((item, index) => (
          <View key={index}>
            <Text className="mb-1 text-sm">{item.question}</Text>

            <View style={styles.botoes}>
              {/* Alterar para check e/ou radio */}
              <Touchable.Container
                onPress={() => responder(item.question, "sim")}
                className="bg-green-500"
              >
                <Touchable.Content>Sim</Touchable.Content>
              </Touchable.Container>

              <Touchable.Container
                onPress={() => responder(item.question, "não")}
                className="bg-red-500"
              >
                <Touchable.Content>Não</Touchable.Content>
              </Touchable.Container>
            </View>
          </View>
        ))}

      <Touchable.Container onPress={salvar} className="mt-7">
        <Touchable.Content>
          {isPendingChecklistResponse
            ? "Finalizando..."
            : "Finalizar Checklist"}
        </Touchable.Content>
      </Touchable.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },

  pergunta: {
    marginBottom: 20,
  },

  textoPergunta: {
    marginBottom: 10,
  },

  botoes: {
    flexDirection: "row",
    gap: 10,
  },

  botao: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },

  salvar: {
    backgroundColor: "#ff6a00",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },

  textoSalvar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
