import { useGetStorageNameQueryData } from "@/src/features/armazens/hooks/storage/queries/queryData/useGetStorageNameQueryData";
import { useChecklistResponse } from "@/src/features/checklist/hooks/mutations/useChecklistResponse";
import { useGetChecklistNameQueryData } from "@/src/features/checklist/hooks/queries/queryData/useGetChecklistNameQueryData";
import { useQuestionsChecklist } from "@/src/features/checklist/hooks/queries/useQuestionsChecklist";
import { useGps } from "@/src/shared/hooks/useGps";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <Text style={styles.titulo}>{checklistNameByStorage}</Text>
      )}

      {isPending && <Text>Loading...</Text>}
      {isError && <Text>Erro ao obter perguntas.</Text>}

      {result &&
        result.map((item, index) => (
          <View key={index} style={styles.pergunta}>
            <Text style={styles.textoPergunta}>{item.question}</Text>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => responder(item.question, "sim")}
              >
                <Text>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botao}
                onPress={() => responder(item.question, "não")}
              >
                <Text>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      <TouchableOpacity style={styles.salvar} onPress={salvar}>
        <Text style={styles.textoSalvar}>
          {isPendingChecklistResponse
            ? "Finalizando..."
            : "Finalizar Checklist"}
        </Text>
      </TouchableOpacity>
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
