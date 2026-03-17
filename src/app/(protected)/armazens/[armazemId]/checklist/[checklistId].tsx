import { getQuestionsByChecklist } from "@/src/features/armazem/services/armazemService";
import {
  generateChecklistPDF,
  registerChecklistResponse,
} from "@/src/features/armazem/services/checklistService";
import { ChecklistType } from "@/src/features/checklist/types/ChecklistType";
import { QuestionChecklistType } from "@/src/features/questions/types/QuestionChecklistType";
import { registerChecklistResponseLocalStorage } from "@/src/localStorage/services/localStorageService";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Checklist() {
  const [checklist, setChecklist] = useState<ChecklistType>();
  const [gps, setGps] = useState("");
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({});
  const { checklistId, armazemId } = useLocalSearchParams<{
    checklistId: string;
    armazemId: string;
  }>();

  const [questions, setQuestions] = useState<QuestionChecklistType[]>([]);

  async function handleSelectChecklist(checklistId: number) {
    const data = await getQuestionsByChecklist(checklistId);
    setQuestions(data);
  }

  async function capturarGPS() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setGps(location.coords.latitude + "," + location.coords.longitude);
  }

  function responder(pergunta: string, resposta: string) {
    setRespostas({
      ...respostas,
      [pergunta]: resposta,
    });
  }

  const salvar = async () => {
    if (!respostas) return;

    const dados = {
      checklistName: "Teste", //todo: inserir nome do checklist
      armazemId: Number(armazemId), //todo: inserir nome do armazem -> possivelmente store
      fotos: [],
      data: new Date().toISOString(),
      gps,
      respostas,
    };

    await registerChecklistResponseLocalStorage(dados);
    await registerChecklistResponse(dados);

    //todo: Refatorar e incluir endpoint
    // await sendWebhookYMS({
    //   tipo: "checklist",
    //   dados,
    // });

    generateChecklistPDF(dados);
    // alert("Checklist registrado"); todo: Inserir toast para mensagens.

    router.back(); //todo: back somente se for gerado com sucesso.
  };

  useEffect(() => {
    capturarGPS();
    handleSelectChecklist(Number(checklistId));
  }, [checklistId]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{checklist?.name}</Text>

      {questions?.map((p, index) => (
        <View key={index} style={styles.pergunta}>
          <Text style={styles.textoPergunta}>{p.question}</Text>

          <View style={styles.botoes}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => responder(p.question, "sim")}
            >
              <Text>Sim</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => responder(p.question, "não")}
            >
              <Text>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.salvar} onPress={salvar}>
        <Text style={styles.textoSalvar}>Finalizar Checklist</Text>
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
