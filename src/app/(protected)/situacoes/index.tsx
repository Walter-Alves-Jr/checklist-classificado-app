import { getClassificationsLocalStorage } from "@/src/localStorage/services/localStorageService";
import AppText from "@/src/shared/components/Text/text";
import { Touchable } from "@/src/shared/components/Touchable";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
        className="w-24 bg-gray-800"
        onPress={() => router.push("/")}
      >
        <Touchable.Content className="text-white">← Voltar</Touchable.Content>
      </Touchable.Container>

      <AppText style={styles.title}>Situação das Classificações</AppText>

      <View className="flex flex-1 flex-col gap-2">
        <View className="rounded-md border border-gray-400 p-4 font-bold">
          <AppText className="font-bold">Realizadas</AppText>
          <AppText className="text-2xl font-bold text-emerald-700">
            {realizadas.length}
          </AppText>
        </View>

        <View className="rounded-md border border-gray-400 p-4">
          <AppText className="font-bold">Pendentes</AppText>
          <AppText className="text-2xl font-bold text-yellow-500">
            {pendentes.length}
          </AppText>
        </View>

        <View className="rounded-md border border-gray-400 p-4">
          <AppText className="font-bold">Recusadas</AppText>
          <AppText className="text-2xl font-bold text-red-700">
            {recusadas.length}
          </AppText>
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
