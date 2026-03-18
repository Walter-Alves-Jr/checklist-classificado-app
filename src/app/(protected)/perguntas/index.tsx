import { useGetStorageNameQueryData } from "@/src/features/armazens/hooks/storage/queries/queryData/useGetStorageNameQueryData";
import { useCheckLinkStorageChecklistQuery } from "@/src/features/armazens/hooks/storage/queries/useCheckLinkStorageChecklistQuery";
import { useStorage } from "@/src/features/armazens/hooks/storage/queries/useStorage";
import { usePostChecklistQuery } from "@/src/features/checklist/hooks/mutations/usePostChecklistQuery";
import { useGetChecklistNameQueryData } from "@/src/features/checklist/hooks/queries/queryData/useGetChecklistNameQueryData";
import { useChecklist } from "@/src/features/checklist/hooks/queries/useChecklist";
import { useQuestionsChecklist } from "@/src/features/checklist/hooks/queries/useQuestionsChecklist";
import { useQuestion } from "@/src/features/perguntas/hooks/useQuestion";
import { QuestionChecklistType } from "@/src/features/perguntas/types/QuestionChecklistType";
import { normalizeTextUtil } from "@/src/shared/utils";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text as TextNative,
  TouchableOpacity,
  View,
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import { RadioButton, Text } from "react-native-paper";

export default function CadastroPerguntas() {
  const [addMode, setAddMode] = useState(false);

  const [storageId, setStorageId] = useState<number | undefined>(undefined);
  const [checklistId, setChecklistId] = useState<number | undefined>(undefined);

  const [questions, setQuestions] = useState<QuestionChecklistType[]>([]);
  const [newTextQuestion, setNewTextQuestion] = useState("");

  const [responseType, setResponseType] = useState("text"); //todo: implementar hookform
  const [requiresPhoto, setRequiresPhoto] = useState<boolean>(false); //todo: implementar hookform

  const { data: storagesResult, isPending: isPendingStorages } = useStorage();
  const { data: checklistsResult, isPending: isPendingChecklists } =
    useChecklist();

  const {
    data: questionsByChecklist,
    isPending: isPendingQuestionByChecklist,
  } = useQuestionsChecklist({ checklistId: Number(checklistId) });

  const { postQuestion, questionName } = useQuestion(
    Number(checklistId),
    newTextQuestion,
  );

  const { mutateAsync: postChecklistQuery } = usePostChecklistQuery();

  const { data: relationChecklistStorage } = useCheckLinkStorageChecklistQuery({
    storageId,
    checklistId,
  });

  const { checklistName } = useGetChecklistNameQueryData({
    checklistId: Number(checklistId),
  });

  const { storageName } = useGetStorageNameQueryData({
    armazemId: Number(storageId),
  });

  async function registerQuestion(questionRequest: QuestionChecklistType[]) {
    if (!storageId || !checklistId || !relationChecklistStorage) return;

    try {
      const hasQuestions = questionRequest.length > 0;
      const isLinked = relationChecklistStorage.length > 0;

      if (isLinked && !hasQuestions) {
        alert(
          `Checklist ${checklistName} já vinculado ao Armazém ${storageName}. Cadastre uma nova pergunta ou um novo checklist.`,
        );
        return;
      }

      if (!isLinked) {
        await postChecklistQuery({ armazemId: storageId, checklistId });
      }

      if (hasQuestions) {
        await postQuestion.mutateAsync({
          questions: questionRequest,
          checklistId,
        });

        alert("Perguntas cadastradas com sucesso");
        resetFormNewQuestion();

        //implementar hookform
        setQuestions([]);
        setStorageId(undefined);
        setChecklistId(undefined);
        setQuestions([]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar perguntas");
    }
  }

  async function handleRegisterChecklistQuestion() {
    if (!checklistId) return;
    await registerQuestion(questions);
  }

  function checksQuestionHasAlreadyBeenRegistered(): boolean {
    const newQuestionNormalized = normalizeTextUtil(newTextQuestion);

    if (!newQuestionNormalized) return false;

    const allQuestions = new Set([
      ...(questionName ? [normalizeTextUtil(questionName)] : []),
      ...questions.map((q) => normalizeTextUtil(q.question)),
    ]);

    if (allQuestions.has(newQuestionNormalized)) {
      alert(`Pergunta já existe no ${checklistName}`);
      return false;
    }

    return true;
  }

  async function handleAddQuestion() {
    if (!newTextQuestion.trim() || !checklistId) return;

    const newQuestion: QuestionChecklistType = {
      id: Date.now(),
      checklistId: Number(checklistId),
      question: newTextQuestion,
      requiresPhoto,
      responseType,
    };

    if (!checksQuestionHasAlreadyBeenRegistered()) return;

    resetFormNewQuestion();
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function resetFormNewQuestion() {
    setRequiresPhoto(false);
    setResponseType("text");
    setNewTextQuestion("");
    setAddMode(false);
  }

  function handleCancelar() {
    resetFormNewQuestion();
  }

  function onChangeStorage(storageId: number) {
    setStorageId(storageId);
    setChecklistId(undefined);
    resetFormNewQuestion();
    setQuestions([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Perguntas</Text>

      <Text>Armazém</Text>

      <Dropdown
        style={styles.dropdown}
        data={storagesResult ?? []}
        labelField="name"
        valueField="id"
        placeholder={isPendingStorages ? "Loading..." : "Selecione o Armazém"}
        value={storageId}
        onChange={(storage) => onChangeStorage(storage.id)}
        disable={isPendingStorages}
      />

      {/* CHECKLIST */}

      <Text>Checklist</Text>

      <Dropdown
        style={styles.dropdown}
        data={checklistsResult ?? []}
        labelField="name"
        valueField="id"
        placeholder={
          isPendingChecklists ? "Loading..." : "Selecione o Checklist"
        }
        value={checklistId}
        onChange={(item) => {
          setChecklistId(item.id);
          setQuestions([]);
        }}
        disable={!storageId || isPendingChecklists}
      />

      {/* PERGUNTAS EXISTENTES */}

      {isPendingQuestionByChecklist && checklistId && <Text>Loading...</Text>}

      {checklistId &&
        questionsByChecklist &&
        questionsByChecklist.length > 0 && (
          <Text>Perguntas do checklist selecionado:</Text>
        )}

      {questionsByChecklist &&
        questionsByChecklist.length === 0 &&
        questions.length === 0 && <Text>Nenhuma pergunta cadastrada.</Text>}

      <View style={styles.perguntasContainer}>
        {questionsByChecklist &&
          questionsByChecklist?.map((item, index) => (
            <View key={index} style={styles.tag}>
              <Text>{item.question}</Text>
            </View>
          ))}

        {questions &&
          questions?.map((item, index) => (
            <View key={index} style={styles.newTag}>
              <Text>{item.question}</Text>
            </View>
          ))}
      </View>

      {/* BOTÃO ADICIONAR */}

      {checklistId ? (
        <TouchableOpacity
          style={[styles.botaoAdicionar, addMode && styles.botaoDesativado]}
          disabled={addMode}
          onPress={() => setAddMode(true)}
        >
          <Text style={styles.textoBotao}>Adicionar +</Text>
        </TouchableOpacity>
      ) : (
        <TextNative />
      )}

      {/* FORMULÁRIO */}

      {addMode && (
        <View>
          <Text style={styles.title}>Adicionar perguntas ao Checklist</Text>
          <Text>Pergunta</Text>

          <TextInput
            placeholder="Digite a pergunta"
            style={styles.input}
            value={newTextQuestion}
            onChangeText={setNewTextQuestion}
          />

          <Text>Exige foto?</Text>

          <View style={styles.row}>
            <RadioButton.Group
              onValueChange={(newValue) =>
                setRequiresPhoto(JSON.parse(newValue))
              }
              value={requiresPhoto.toString()}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="true" color="#ff6a00" />
                  <Text>Sim</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="false" color="#ff6a00" />
                  <Text>Não</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <Text>Tipo de resposta</Text>

          <RadioButton.Group
            onValueChange={(newValue) => setResponseType(newValue)}
            value={responseType}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="text" color="#ff6a00" />
                <Text>Texto</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="number" color="#ff6a00" />
                <Text>Número</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="multiple" color="#ff6a00" />
                <Text>Múltiplo</Text>
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.salvar} onPress={handleAddQuestion}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelar}
              onPress={() => handleCancelar()}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.cadastrar}
          onPress={handleRegisterChecklistQuestion}
        >
          <Text style={styles.textoBotao}>
            {postQuestion.isPending ? "Cadastrando..." : "Cadastrar Pergunta"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  perguntasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },

  radioContainer: {
    display: "flex",
    gap: 8,
  },

  radioRow: {
    display: "flex",
    flexDirection: "row",
  },

  tag: {
    backgroundColor: "#c4c4c46f",
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },

  newTag: {
    backgroundColor: "#28ec7a",
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },

  botaoAdicionar: {
    backgroundColor: "#ff6a00",
    padding: 10,
    borderRadius: 8,
    width: 120,
    alignItems: "center",
    marginVertical: 4,
    marginBottom: 30,
  },

  botaoDesativado: {
    opacity: 0.5,
  },

  textoBotao: {
    color: "white",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 6,
    marginBottom: 20,
    borderRadius: 6,
  },

  row: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 10,
  },

  tipo: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },

  salvar: {
    backgroundColor: "#ff6a00",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "48%",
  },

  cancelar: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
    width: "48%",
  },

  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginVertical: 6,
  },

  actionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4%",
    marginVertical: 12,
  },

  cadastrar: {
    backgroundColor: "#ff6a00",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
});
