import { useArmazensQuery } from "@/src/features/armazens/hooks/storage/queries/use-armazens-query";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import { Touchable } from "@/src/shared/components/Touchable";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Armazens() {
  const { isPending, isError, data } = useArmazensQuery();

  function handleSelectArmazem(id: number) {
    router.push({
      pathname: "/armazens/[armazemId]",
      params: {
        armazemId: id.toString(),
      },
    });
  }

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
          {data?.length === 0 && <Text>Nenhum armazem cadastrado.</Text>}
          {isError && <Text>Erro ao obter armazens.</Text>}

          {data &&
            data.map((item) => (
              <Touchable.Container
                key={item.id}
                onPress={() => handleSelectArmazem(item.id)}
              >
                <Touchable.Content>{item.nome}</Touchable.Content>
              </Touchable.Container>
            ))}
        </View>
      </AppContainer>
    </>
  );
}
