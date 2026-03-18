import { useStorage } from "@/src/features/armazens/hooks/storage/queries/useStorage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Armazens() {
  const { data: result, isPending, isError, selectedStorage } = useStorage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Armazém</Text>

      {/* todo: alterar para toast */}
      {isPending && <Text>Loading...</Text>}
      {/*menos esse */}
      {result?.length === 0 && <Text>Nenhum armazem cadastrado.</Text>}
      {isError && <Text>Erro ao obter armazens.</Text>}

      {result &&
        result.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.botao}
            onPress={() => selectedStorage(item.id)}
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
