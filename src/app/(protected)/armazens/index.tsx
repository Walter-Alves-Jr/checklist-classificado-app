import { StorageType } from "@/_app/services/storage";
import { listarArmazens } from "@/src/features/armazem/services/armazemService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Armazens() {
  const [armazens, setArmazem] = useState<StorageType[]>([]);

  async function getArmazens() {
    const payload = await listarArmazens();
    setArmazem(payload);
  }

  function selectedArmazem(armazemId: number) {
    router.push({
      pathname: "/armazens/[armazemId]",
      params: {
        armazemId: armazemId.toString(),
      },
    });
  }

  useEffect(() => {
    getArmazens();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Armazém</Text>

      {armazens.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.botao}
          onPress={() => selectedArmazem(item.id)}
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
