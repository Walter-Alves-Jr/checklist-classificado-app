import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import AppText from "@/src/shared/components/Text/AppText";
import { router } from "expo-router";

export default function Configuracoes() {
  return (
    <>
      <HeaderPage title="Configurações" goBack={() => router.push("/")} />
      <AppContainer>
        <AppText variant="secondary">Em breve...</AppText>
      </AppContainer>
    </>
  );
}
