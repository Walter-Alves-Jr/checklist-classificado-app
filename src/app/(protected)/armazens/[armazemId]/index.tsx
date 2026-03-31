import { useChecklistByStorage } from "@/src/features/checklist/hooks/queries/useChecklistByStorage";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import { Touchable } from "@/src/shared/components/Touchable";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Checklists() {
  const { armazemId } = useLocalSearchParams<{
    armazemId: string;
  }>();

  const {
    data: result,
    isPending,
    isError,
    selectedCheckList,
  } = useChecklistByStorage(Number(armazemId));

  function goBack() {
    router.back();
  }

  // Alterar seleção de armazens no inicio de checklist para compor um select com multiplos armazens para ser selecionado pelo usuário, permitindo uma busca por filtro também.

  return (
    <>
      <HeaderPage goBack={goBack} title="Selecionar Checklist" />
      <AppContainer>
        {/* todo: alterar para toast */}
        {isPending && <Text>Loading...</Text>}
        {/*menos esse */}
        {result?.length === 0 && <Text>Nenhum checklist cadastrado.</Text>}
        {isError && <Text>Erro ao obter checklists.</Text>}

        {result &&
          result.map((item: any) => (
            <Touchable.Container
              key={item.id}
              onPress={() => selectedCheckList(item.id)}
            >
              <Touchable.Content>{item.name}</Touchable.Content>
            </Touchable.Container>
          ))}
      </AppContainer>
    </>
  );
}
