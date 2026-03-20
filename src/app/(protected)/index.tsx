import { Logo } from "@/src/shared/components/Logo";
import { Touchable } from "@/src/shared/components/Touchable";
import { useTwTheme } from "@/src/theme/useTwTheme";
import { router } from "expo-router";
import { Text, View } from "react-native";

// página inicial

export default function Index() {
  const tw = useTwTheme();

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

  return (
    <View className="flex flex-1 justify-center">
      <View className="flex items-center">
        <Logo />
        <View className="mt-2">
          <Text className="text-lg">
            Bem-vindo, <Text className="font-bold">{tw.name}</Text>
          </Text>
        </View>
      </View>

      <View className="flex justify-center p-7 text-center">
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
      </View>
    </View>
  );
}
