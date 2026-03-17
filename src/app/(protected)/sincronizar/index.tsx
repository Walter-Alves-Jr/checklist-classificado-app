import { getChecklistsLocalStorage } from "@/src/localStorage/services/localStorageService";
import { sendWebhookYMS } from "@/src/shared/services/webHookYMSService";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Sincronizar() {
  const [status, setStatus] = useState("");

  const sincronizar = async () => {
    try {
      const dados = await getChecklistsLocalStorage();

      if (!dados || dados.length === 0) {
        alert("Nada para sincronizar");
        return;
      }
      await sendWebhookYMS(dados);

      setStatus("Sincronizado com sucesso");
      alert("Sincronização concluída");
    } catch {
      alert("Erro ao sincronizar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sincronização</Text>

      <TouchableOpacity style={styles.botao} onPress={sincronizar}>
        <Text style={styles.textoBotao}>Sincronizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  titulo: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },

  botao: {
    backgroundColor: "#ff6a00",
    padding: 15,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
