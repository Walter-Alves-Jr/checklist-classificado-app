import { useGetStorageNameQueryData } from "@/src/features/armazens/hooks/storage/queries/queryData/useGetStorageNameQueryData";
import { useCheckLinkStorageChecklistQuery } from "@/src/features/armazens/hooks/storage/queries/useCheckLinkStorageChecklistQuery";
import { useStorage } from "@/src/features/armazens/hooks/storage/queries/useStorage";
import { usePostChecklistQuery } from "@/src/features/checklist/hooks/mutations/usePostChecklistQuery";
import { useGetChecklistNameQueryData } from "@/src/features/checklist/hooks/queries/queryData/useGetChecklistNameQueryData";
import { useChecklist } from "@/src/features/checklist/hooks/queries/useChecklist";
import { useQuestionsChecklist } from "@/src/features/checklist/hooks/queries/useQuestionsChecklist";
import { useQuestion } from "@/src/features/perguntas/hooks/useQuestion";
import { QuestionChecklistType } from "@/src/features/perguntas/types/QuestionChecklistType";
import { Touchable } from "@/src/shared/components/Touchable";
import { normalizeTextUtil } from "@/src/shared/utils";
import { useTwTheme } from "@/src/theme/useTwTheme";
import { useState } from "react";
import { StyleSheet, TextInput, Text as TextNative, View } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import { RadioButton, Text } from "react-native-paper";

export default function CadastroPerguntas() {
  const [addMode, setAddMode] = useState(false);
  const tw = useTwTheme();

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
    <View className="p-5">
      <Text className="text-2xl mb-7">Cadastro de Perguntas</Text>

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

      <View className="flex flex-row gap-2 mt-2 mb-4">
        {questionsByChecklist &&
          questionsByChecklist?.map((item, index) => (
            <View key={index} className="bg-gray-300 p-2 rounded-md">
              <Text>{item.question}</Text>
            </View>
          ))}

        {questions &&
          questions?.map((item, index) => (
            <View key={index} className="bg-emerald-500 p-2 rounded-md">
              <Text>{item.question}</Text>
            </View>
          ))}
      </View>

      {/* BOTÃO ADICIONAR */}

      {checklistId ? (
        <Touchable.Container
          disabled={addMode}
          style={addMode && { opacity: 0.5 }}
          onPress={() => setAddMode(true)}
          className="w-32 mb-5"
        >
          <Touchable.Content>Adicionar +</Touchable.Content>
        </Touchable.Container>
      ) : (
        <TextNative />
      )}

      {/* FORMULÁRIO */}

      {addMode && (
        <View className="border rounded-md border-slate-300 p-3 mb-5">
          <Text className="text-xl mb-2">Adicionar perguntas ao Checklist</Text>
          <Text>Pergunta</Text>

          <TextInput
            placeholder="Digite a pergunta"
            style={styles.input}
            value={newTextQuestion}
            onChangeText={setNewTextQuestion}
          />

          <View className="flex flex-col mb-4 gap-y-3">
            <View>
              <Text>Exige foto?</Text>

              <RadioButton.Group
                onValueChange={(newValue) =>
                  setRequiresPhoto(JSON.parse(newValue))
                }
                value={requiresPhoto.toString()}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="true"
                      color={tw.bgPrimary.backgroundColor}
                    />
                    <Text>Sim</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="false"
                      color={tw.bgPrimary.backgroundColor}
                    />
                    <Text>Não</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>

            <View>
              <Text>Tipo de resposta</Text>

              <RadioButton.Group
                onValueChange={(newValue) => setResponseType(newValue)}
                value={responseType}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="text"
                      color={tw.bgPrimary.backgroundColor}
                    />
                    <Text>Texto</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="number"
                      color={tw.bgPrimary.backgroundColor}
                    />
                    <Text>Número</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="multiple"
                      color={tw.bgPrimary.backgroundColor}
                    />
                    <Text>Múltiplo</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <View className="flex items-center justify-center flex-row gap-2 mb-1">
            <Touchable.Container
              onPress={handleAddQuestion}
              className="w-1/2 mb-0"
            >
              <Touchable.Content>Salvar</Touchable.Content>
            </Touchable.Container>

            <Touchable.Container
              className="text-black bg-transparent border border-black w-1/2 mb-0"
              style={{ backgroundColor: "transparent" }}
              onPress={() => handleCancelar()}
            >
              <Touchable.Content style={{ color: "black" }}>
                Cancelar
              </Touchable.Content>
            </Touchable.Container>
          </View>
        </View>
      )}

      <View>
        <Touchable.Container onPress={handleRegisterChecklistQuestion}>
          <Touchable.Content>
            {postQuestion.isPending ? "Cadastrando..." : "Cadastrar Pergunta"}
          </Touchable.Content>
        </Touchable.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 6,
    marginBottom: 20,
    borderRadius: 6,
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
});
