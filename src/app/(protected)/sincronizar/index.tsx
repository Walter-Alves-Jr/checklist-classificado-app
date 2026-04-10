import { getChecklistsLocalStorage } from "@/src/localStorage/services/localStorageService";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper/screen-wrapper";
import { Touchable } from "@/src/shared/components/Touchable";
import { sendWebhookYMS } from "@/src/shared/services/webHookYMSService";
import { router } from "expo-router";
import { useState } from "react";

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

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage title="Sincronizar Dados" goBack={goBack} />

      <ScreenWrapper>
        <Touchable.Container onPress={sincronizar}>
          <Touchable.Content>Sincronizar</Touchable.Content>
        </Touchable.Container>
      </ScreenWrapper>
    </>
  );
}
