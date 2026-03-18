import { useChecklistByStorage } from "@/src/features/checklist/hooks/queries/useChecklistByStorage";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Checklists() {
  const { armazemId } = useLocalSearchParams<{
    armazemId: string;
  }>();

  const {
    data: result,
    isPending,
    isError,
    selectedCheckList,
  } = useChecklistByStorage(Number(armazemId));

  // Alterar seleção de armazens no inicio de checklist para compor um select com multiplos armazens para ser selecionado pelo usuário, permitindo uma busca por filtro também.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Checklist</Text>

      {/* todo: alterar para toast */}
      {isPending && <Text>Loading...</Text>}
      {/*menos esse */}
      {result?.length === 0 && <Text>Nenhum checklist cadastrado.</Text>}
      {isError && <Text>Erro ao obter checklists.</Text>}

      {result &&
        result.map((item: any) => (
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
