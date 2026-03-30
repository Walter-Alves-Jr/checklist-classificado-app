import { useChecklistByStorage } from "@/src/features/checklist/hooks/queries/useChecklistByStorage";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import AppText from "@/src/shared/components/Text/AppText";
import { Touchable } from "@/src/shared/components/Touchable";
import { useLocalSearchParams } from "expo-router";
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

  // Alterar seleção de armazens no inicio de checklist para compor um select com multiplos armazens para ser selecionado pelo usuário, permitindo uma busca por filtro também.

  return (
    <AppContainer>
      <AppText className="mb-7 text-center text-3xl">
        Selecionar Checklist
      </AppText>

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
  );
}
