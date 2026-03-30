import { useStorage } from "@/src/features/armazens/hooks/storage/queries/useStorage";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import { Touchable } from "@/src/shared/components/Touchable";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Armazens() {
  const { data: result, isPending, isError, selectedStorage } = useStorage();

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage goBack={goBack} title="Selecionar Armazém" />

      <AppContainer>
        <View className="flex flex-1">
          {/* todo: alterar para spinner */}
          {isPending && <Text>Loading...</Text>}
          {/*menos esse */}
          {result?.length === 0 && <Text>Nenhum armazem cadastrado.</Text>}
          {isError && <Text>Erro ao obter armazens.</Text>}

          {result &&
            result.map((item) => (
              <Touchable.Container
                key={item.id}
                onPress={() => selectedStorage(item.id)}
              >
                <Touchable.Content>{item.name}</Touchable.Content>
              </Touchable.Container>
            ))}
        </View>
      </AppContainer>
    </>
  );
}
