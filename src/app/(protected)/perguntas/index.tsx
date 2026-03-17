import {
  checkLinkStorageChecklist,
  checkQuestionChecklist,
  listarArmazens,
  listarChecklists,
  listarPerguntasChecklist,
  postChecklist,
  postQuestionChecklist,
} from "@/src/features/armazem/services/armazemService";
import { StorageType } from "@/src/features/armazem/types/StorageType";
import { ChecklistQuestionType } from "@/src/features/checklist/types/ChecklistQuestionType";
import { ChecklistType } from "@/src/features/checklist/types/ChecklistType";
import { useEffect, useState } from "react";
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

  const [storageId, setStorageId] = useState<number | null>(null);
  const [storageName, setStorageName] = useState<number | null>(null);
  const [storage, setStorage] = useState<StorageType[]>([]);

  const [checklistId, setChecklistId] = useState<number | null>(null);
  const [checklistName, setChecklistName] = useState<string>("");
  const [checklists, setChecklists] = useState<ChecklistType[]>([]);

  const [questions, setQuestions] = useState<ChecklistQuestionType[]>([]);
  const [newTextQuestion, setNewTextQuestion] = useState("");
  const [responseType, setResponseType] = useState("text");
  const [requiresPhoto, setRequiresPhoto] = useState<boolean>(false);

  async function registerQuestion(
    storageId: number,
    checklistId: number,
    question: string,
    requiresPhoto: boolean,
    responseType: string,
  ) {
    // 1️⃣ verificar vínculo
    const relation = await checkLinkStorageChecklist(storageId, checklistId);

    if (relation.length === 0) {
      await postChecklist(storageId, checklistId);
    }

    // 2️⃣ verificar se pergunta já existe
    const questions = await checkQuestionChecklist(checklistId);

    const exists = questions.some(
      (q: any) => q.question.toLowerCase() === question.toLocaleLowerCase(),
    );

    if (relation && question === "") {
      alert(
        `Checklist ${checklistName} já vinculado ao Armazém ${storageName}. Cadastre uma nova pergunta ou um novo checklist.`,
      );
      return;
    }

    if (exists) {
      alert("Pergunta já existe nesse checklist");
      return;
    }
    await postQuestionChecklist({
      id: Math.random(),
      checklistId,
      question,
      requiresPhoto,
      responseType,
    });
    alert("Pergunta cadastrada");
  }

  async function handleRegisterChecklistQuestion() {
    if (!storageId || !checklistId) return;
    await registerQuestion(
      storageId,
      checklistId,
      newTextQuestion,
      requiresPhoto,
      responseType,
    );
  }

  function handleAddQuestion() {
    if (!newTextQuestion.trim()) return;

    const newQuestion: ChecklistQuestionType = {
      id: Math.random(),
      question: newTextQuestion,
    };

    setQuestions((prev) => [...prev, newQuestion]);

    // resetFormNewQuestion();
    setAddMode(false);
  }

  function resetFormNewQuestion() {
    setRequiresPhoto(false);
    setResponseType("text");
    setNewTextQuestion("");
  }

  function handleCancelar() {
    resetFormNewQuestion();
    setAddMode(false);
  }

  async function getStorageList() {
    const payload = await listarArmazens();

    if (!payload) return;

    setStorage(payload);
  }

  async function getChecklists() {
    const payload = await listarChecklists();

    if (!payload) return;

    setChecklists(payload);
  }

  async function getQuestionsForChecklistSelected(checklistId: number) {
    const data = await listarPerguntasChecklist(checklistId);
    setQuestions(data);
  }

  function getPerguntasChecklistSelected(checklistId: number | null) {
    if (!checklistId) return;
    getQuestionsForChecklistSelected(checklistId);
  }

  useEffect(() => {
    getStorageList();
  }, []);

  useEffect(() => {
    getPerguntasChecklistSelected(checklistId);
  }, [checklistId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Perguntas</Text>

      <Text>Armazém</Text>

      <Dropdown
        style={styles.dropdown}
        data={storage}
        labelField="name"
        valueField="id"
        placeholder="Selecione o Armazém"
        value={storageId}
        onChange={(item) => {
          setStorageId(item.id);
          setStorageName(item.name);
          getChecklists();
          setChecklistId(null);
        }}
      />

      {/* CHECKLIST */}

      <Text>Checklist</Text>

      <Dropdown
        style={styles.dropdown}
        data={checklists}
        labelField="name"
        valueField="id"
        placeholder="Selecione o Checklist"
        value={checklistId}
        onChange={(item) => {
          setChecklistId(item.id);
          setChecklistName(item.name);
        }}
        disable={!storageId}
      />

      {/* PERGUNTAS EXISTENTES */}

      {checklistId ? (
        <Text>Perguntas do checklist selecionado:</Text>
      ) : (
        <TextNative />
      )}

      <View style={styles.perguntasContainer}>
        {questions.map((item, index) => (
          <View key={index} style={styles.tag}>
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
          <Text style={styles.textoBotao}>Cadastrar Pergunta</Text>
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
