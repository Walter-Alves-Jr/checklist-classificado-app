import { getChecklistsLocalStorage } from "@/src/localStorage/services/localStorageService";
import { Touchable } from "@/src/shared/components/Touchable";
import { sendWebhookYMS } from "@/src/shared/services/webHookYMSService";
import { useState } from "react";
import { Text, View } from "react-native";

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
    <View className="flex flex-1 items-center justify-center">
      <Text className="text-xl mb-2">Sincronização</Text>

      <Touchable.Container onPress={sincronizar}>
        <Touchable.Content>Sincronizar</Touchable.Content>
      </Touchable.Container>
    </View>
  );
}
