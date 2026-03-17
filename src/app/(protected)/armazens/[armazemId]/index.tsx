import { CheckList } from "@/_app/services/storage";
import { getChecklistsByStorage } from "@/src/features/armazem/services/armazemService";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Checklists() {
  const [checklists, setCheckList] = useState<CheckList[]>([]);

  async function handleSelectStorage(armazemId: number) {
    const data = await getChecklistsByStorage(armazemId);
    setCheckList(data);
  }

  const { armazemId } = useLocalSearchParams<{
    armazemId: string;
  }>();

  function selectedCheckList(checklistId: number) {
    router.push({
      pathname: "/armazens/[armazemId]/checklist/[checklistId]",
      params: {
        armazemId: armazemId.toString(),
        checklistId: checklistId.toString(),
      },
    });
  }

  useEffect(() => {
    handleSelectStorage(Number(armazemId));
  }, [armazemId]);

  // Alterar seleção de armazens no inicio de checklist para compor um select com multiplos armazens para ser selecionado pelo usuário, permitindo uma busca por filtro também.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Checklist</Text>

      {checklists.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.botao}
          onPress={() => selectedCheckList(item.id)}
        >
          <Text style={styles.texto}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  title: {
    fontSize: 26,
    marginBottom: 40,
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#ff6a00",
    padding: 18,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },

  texto: {
    color: "white",
    fontWeight: "bold",
  },
});
