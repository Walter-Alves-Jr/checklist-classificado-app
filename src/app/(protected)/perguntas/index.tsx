import { useArmazensQuery } from "@/src/features/armazens/hooks/storage/queries/use-armazens-query";
import { useChecklistsQuery } from "@/src/features/checklists/hooks/queries/use-checklists-query";
import { usePerguntasMutation } from "@/src/features/perguntas/hooks/storage/mutations/use-perguntas.mutation";
import { usePerguntasChecklistQuery } from "@/src/features/perguntas/hooks/storage/queries/use-perguntas-checklist-query";
import { usePerguntas } from "@/src/features/perguntas/hooks/use-perguntas";
import { Pergunta } from "@/src/features/perguntas/types/Pergunta";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import AppText from "@/src/shared/components/Text/AppText";
import { useToast } from "@/src/shared/components/Toast";
import { Touchable } from "@/src/shared/components/Touchable";
import { app_colors } from "@/src/shared/consts";
import { toLowerAndTrim } from "@/src/shared/utils";
import { useBrand } from "@/src/theme/useBrand";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, Text as TextNative, View } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import { RadioButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CadastroPerguntas() {
  const [addMode, setAddMode] = useState(false);
  const brand = useBrand();

  const [storageId, setStorageId] = useState<number | undefined>(undefined);
  const [checklistId, setChecklistId] = useState<number | undefined>(undefined);

  const [questions, setQuestions] = useState<Pergunta[]>([]);
  const [newTextQuestion, setNewTextQuestion] = useState("");

  const [responseType, setResponseType] = useState("multiple"); //todo: implementar hookform
  const [requiresPhoto, setRequiresPhoto] = useState<boolean>(false); //todo: implementar hookform

  const { data: armazens, isPending: isPendingArmazens } = useArmazensQuery();
  const { data: checklistsResult, isPending: isPendingChecklists } =
    useChecklistsQuery();

  const { data: perguntasChecklist, isPending: isPendingPerguntasChecklist } =
    usePerguntasChecklistQuery(Number(checklistId));

  const {
    mutateAsync: cadastrarPerguntas,
    isPending: isPendingCadastroPerguntas,
  } = usePerguntasMutation();
  const { perguntaExisteNoChecklist } = usePerguntas();

  const { show } = useToast();

  async function registerQuestion(perguntas: Pergunta[]) {
    if (!storageId || !checklistId || perguntas.length <= 0) return;

    try {
      const response = await cadastrarPerguntas({
        checklistId: checklistId,
        perguntas,
      });

      if (!response)
        show({
          title: "Erro!",
          description: "Não foi possível cadastrar perguntas.",
          type: "error",
        });

      show({ title: "Sucesso!", description: "Perguntas cadastradas." });
      resetFormNewQuestion();

      //implementar hookform
      setQuestions([]);
      setStorageId(undefined);
      setChecklistId(undefined);
      setQuestions([]);
    } catch {
      show({
        title: "Erro!",
        description: "Não foi possível cadastrar perguntas.",
        type: "error",
      });
    }
  }

  async function handleCadastrarPerguntasChecklist() {
    if (!checklistId) return;
    await registerQuestion(questions);
  }

  async function handleAddQuestion() {
    if (!newTextQuestion.trim() || !checklistId) return;

    const newQuestion: Pergunta = {
      id: Date.now(),
      checklist_id: Number(checklistId),
      pergunta: newTextQuestion,
      requires_photo: requiresPhoto ? 1 : 0,
      response_type: responseType,
    };

    const response = await perguntaExisteNoChecklist(
      checklistId,
      toLowerAndTrim(newTextQuestion),
    );

    const existePerguntaNoState = questions.filter(
      (q) => toLowerAndTrim(q.pergunta) === toLowerAndTrim(newTextQuestion),
    );

    if (response) return;
    if (existePerguntaNoState.length > 0) {
      show({
        title: "Ops!",
        description: "Pergunta já existe no checklist.",
        type: "warning",
      });
      return;
    }

    resetFormNewQuestion();
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function resetFormNewQuestion() {
    setRequiresPhoto(false);
    setResponseType("multiple");
    setNewTextQuestion("");
  }

  function handleCancelar() {
    resetFormNewQuestion();
    setAddMode(false);
  }

  function onChangeStorage(storageId: number) {
    setStorageId(storageId);
    setChecklistId(undefined);
    resetFormNewQuestion();
    setQuestions([]);
  }

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage title="Cadastro de Perguntas" goBack={goBack} />

      <AppContainer>
        <SafeAreaView>
          <Text>Armazém</Text>

          <Dropdown
            style={styles.dropdown}
            data={armazens ?? []}
            labelField="nome"
            valueField="id"
            placeholder={
              isPendingArmazens ? "Loading..." : "Selecione o Armazém"
            }
            value={storageId}
            onChange={(storage) => onChangeStorage(storage.id)}
            disable={isPendingArmazens}
          />

          {/* CHECKLIST */}

          <Text>Checklist</Text>

          <Dropdown
            style={styles.dropdown}
            data={checklistsResult ?? []}
            labelField="nome"
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

          {isPendingPerguntasChecklist && checklistId && (
            <Text>Loading...</Text>
          )}

          {checklistId &&
            perguntasChecklist &&
            perguntasChecklist.length > 0 && (
              <Text>Perguntas do checklist selecionado:</Text>
            )}

          {perguntasChecklist &&
            perguntasChecklist.length === 0 &&
            questions.length === 0 && <Text>Nenhuma pergunta cadastrada.</Text>}

          <View className="mb-4 mt-2 flex flex-row flex-wrap gap-2">
            {perguntasChecklist &&
              perguntasChecklist?.map((item, index) => (
                <View key={index} className="rounded-md bg-gray-300 p-2">
                  <Text>{item.pergunta}</Text>
                </View>
              ))}

            {questions &&
              questions?.map((item, index) => (
                <View key={index} className="rounded-md bg-emerald-500 p-2">
                  <Text>{item.pergunta}</Text>
                </View>
              ))}
          </View>

          {/* BOTÃO ADICIONAR */}

          {checklistId ? (
            <Touchable.Container
              disabled={addMode}
              style={addMode && { opacity: 0.5 }}
              onPress={() => setAddMode(true)}
              className="mb-5 w-32"
            >
              <Touchable.Content>Adicionar +</Touchable.Content>
            </Touchable.Container>
          ) : (
            <TextNative />
          )}

          {/* FORMULÁRIO */}

          {addMode && (
            <View className="mb-5 rounded-md border border-slate-300 p-3">
              <AppText
                className="mb-2 text-xl"
                style={{ color: app_colors.text.secondary }}
              >
                Adicionar perguntas ao Checklist
              </AppText>
              <Text>Pergunta</Text>

              <TextInput
                placeholder="Digite a pergunta"
                style={styles.input}
                value={newTextQuestion}
                onChangeText={setNewTextQuestion}
                autoFocus
              />

              <View className="mb-4 flex flex-col gap-y-3">
                <View>
                  <Text>Exige foto?</Text>

                  <RadioButton.Group
                    onValueChange={(newValue) =>
                      setRequiresPhoto(JSON.parse(newValue))
                    }
                    value={requiresPhoto.toString()}
                  >
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value="true"
                          color={brand.background.primary.backgroundColor}
                        />
                        <Text>Sim</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value="false"
                          color={brand.background.primary.backgroundColor}
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value="multiple"
                          color={brand.background.primary.backgroundColor}
                        />
                        <Text>Múltiplo</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value="text"
                          color={brand.background.primary.backgroundColor}
                        />
                        <Text>Texto</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value="number"
                          color={brand.background.primary.backgroundColor}
                        />
                        <Text>Número</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>

              <View className="mb-1 flex flex-row items-center justify-center gap-2">
                <Touchable.Container
                  onPress={handleAddQuestion}
                  className="mb-0 w-1/2"
                >
                  <Touchable.Content>Salvar</Touchable.Content>
                </Touchable.Container>

                <Touchable.Container
                  className="mb-0 w-1/2 border border-black bg-transparent"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: app_colors.background.secondary,
                  }}
                  onPress={() => handleCancelar()}
                >
                  <Touchable.Content
                    style={{ color: app_colors.text.secondary }}
                  >
                    Cancelar
                  </Touchable.Content>
                </Touchable.Container>
              </View>
            </View>
          )}

          <View className="mb-16">
            <Touchable.Container onPress={handleCadastrarPerguntasChecklist}>
              <Touchable.Content>
                {isPendingCadastroPerguntas
                  ? "Cadastrando..."
                  : "Cadastrar Perguntas"}
              </Touchable.Content>
            </Touchable.Container>
          </View>
        </SafeAreaView>
      </AppContainer>
    </>
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
