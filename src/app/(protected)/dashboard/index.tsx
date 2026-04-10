import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper/screen-wrapper";
import AppText from "@/src/shared/components/Text/AppText";
import { router } from "expo-router";

export default function Dashboard() {
  return (
    <>
      <HeaderPage title="Dashboard" goBack={() => router.push("/")} />
      <ScreenWrapper>
        <AppText variant="secondary">Em breve...</AppText>
      </ScreenWrapper>
    </>
  );
}
