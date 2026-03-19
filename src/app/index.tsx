import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { clients } from "../config/clientConfig";
import { Logo } from "../shared/components/Logo";
import { Touchable } from "../shared/components/Touchable";
import { useTheme } from "../theme/ThemeProvider";

export default function Index() {
  const { setClient } = useTheme();
  const loadArmazens = () => {
    router.push("/armazens");
  };

  const abrirPerguntas = () => {
    router.push("/perguntas");
  };

  const abrirSincronizar = () => {
    router.push("/sincronizar");
  };

  const abrirClassificador = () => {
    router.push("/classificador");
  };

  const abrirSituacao = () => {
    router.push("/situacoes");
  };

  async function handleLogin() {
    const client = clients.system;
    setClient(client);

    await AsyncStorage.setItem("client", JSON.stringify(client));
  }

  return (
    <View className="flex flex-1 justify-center p-7">
      <Text className="text-3xl text-center mb-7">Yard Checklist</Text>

      <Touchable.Container onPress={loadArmazens}>
        <Touchable.Content>Iniciar Checklist</Touchable.Content>
      </Touchable.Container>

      <Touchable.Container onPress={abrirPerguntas}>
        <Touchable.Content>Cadastrar Perguntas</Touchable.Content>
      </Touchable.Container>

      <Touchable.Container onPress={abrirSincronizar}>
        <Touchable.Content>Sincronizar Dados</Touchable.Content>
      </Touchable.Container>

      <Touchable.Container onPress={abrirClassificador}>
        <Touchable.Content>Classificador de Grãos</Touchable.Content>
      </Touchable.Container>

      <Touchable.Container onPress={abrirSituacao}>
        <Touchable.Content>Situação Classificações</Touchable.Content>
      </Touchable.Container>

      <Touchable.Container>
        <Touchable.Content onPress={handleLogin}>
          Teste de tema
        </Touchable.Content>
      </Touchable.Container>

      <Text>Imagem do cliente logado: </Text>
      <Logo />
    </View>
  );
}
