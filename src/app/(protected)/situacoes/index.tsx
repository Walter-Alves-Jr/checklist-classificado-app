import { getClassificationsLocalStorage } from "@/src/localStorage/services/localStorageService";
import { Touchable } from "@/src/shared/components/Touchable";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Situacoes() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const lista = await getClassificationsLocalStorage();

    setDados(lista);
  };

  const realizadas = dados.filter((d) => d.status === "REALIZADA");
  const recusadas = dados.filter((d) => d.status === "RECUSADA");
  const pendentes = dados.filter((d) => d.status === "PENDENTE");

  return (
    <ScrollView style={styles.container}>
      <Touchable.Container
        className="bg-gray-800 w-24"
        onPress={() => router.push("/")}
      >
        <Touchable.Content className="text-white">← Voltar</Touchable.Content>
      </Touchable.Container>

      <Text style={styles.title}>Situação das Classificações</Text>

      <View className="flex flex-1 flex-col gap-2">
        <View className="border border-gray-400 rounded-md p-4 font-bold">
          <Text className="font-bold">Realizadas</Text>
          <Text className="text-2xl font-bold text-emerald-700">
            {realizadas.length}
          </Text>
        </View>

        <View className="border border-gray-400 rounded-md p-4">
          <Text className="font-bold">Pendentes</Text>
          <Text className="text-2xl font-bold text-yellow-500">
            {pendentes.length}
          </Text>
        </View>

        <View className="border border-gray-400 rounded-md p-4">
          <Text className="font-bold">Recusadas</Text>
          <Text className="text-2xl font-bold text-red-700">
            {recusadas.length}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  voltar: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: "flex-start",
  },

  title: {
    fontSize: 26,
    marginBottom: 30,
  },

  card: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
  },

  valor: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
