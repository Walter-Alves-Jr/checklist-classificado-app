import { useChecklistArmazemQuery } from "@/src/features/checklists/hooks/queries/use-checklist-armazem-query";
import { Checklist } from "@/src/features/checklists/types/Checklist";
import AppContainer from "@/src/shared/components/Container/AppContainer";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import { Touchable } from "@/src/shared/components/Touchable";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Checklists() {
  const { armazemId } = useLocalSearchParams<{
    armazemId: string;
  }>();

  const { data, isPending, isError } = useChecklistArmazemQuery(
    Number(armazemId),
  );

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
        {data?.length === 0 && <Text>Nenhum checklist cadastrado.</Text>}
        {isError && <Text>Erro ao obter checklists.</Text>}

        {data &&
          data.map((item: Checklist) => (
            <Touchable.Container key={item.id}>
              <Touchable.Content>{item.nome}</Touchable.Content>
            </Touchable.Container>
          ))}
      </AppContainer>
    </>
  );
}
