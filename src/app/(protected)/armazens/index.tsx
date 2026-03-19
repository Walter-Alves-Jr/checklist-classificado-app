import { useStorage } from "@/src/features/armazens/hooks/storage/queries/useStorage";
import { Touchable } from "@/src/shared/components/Touchable";
import { Text, View } from "react-native";

export default function Armazens() {
  const { data: result, isPending, isError, selectedStorage } = useStorage();

  return (
    <View className="flex flex-1 justify-center p-7">
      <Text className="text-3xl text-center mb-7">Selecionar Armazém</Text>

      {/* todo: alterar para toast */}
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
  );
}
