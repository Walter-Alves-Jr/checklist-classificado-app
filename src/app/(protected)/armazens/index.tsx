import { useArmazensQuery } from "@/src/features/armazens/hooks/storage/queries/use-armazens-query";
import AppDropdown from "@/src/shared/components/Dropdown/app-dropdown";
import HeaderPage from "@/src/shared/components/Header/HeaderPage";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const armazemSchema = z.object({
  armazemId: z.number().min(1, "Selecione um armazém."),
});

type ArmazemSchema = z.infer<typeof armazemSchema>;

export default function Armazens() {
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search);

  const { data, isLoading } = useArmazensQuery(searchDebounced);

  const { control } = useForm<ArmazemSchema>({
    resolver: zodResolver(armazemSchema),
    defaultValues: {
      armazemId: 0,
    },
  });

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

      <Controller
        control={control}
        name="armazemId"
        render={({ field }) => {
          return (
            <AppDropdown
              placeholder="Selecionar Armazém"
              value={field.value}
              onChange={field.onChange}
              data={data ?? []}
              onSearchChange={setSearch}
              search={search}
              loading={isLoading}
              options={(item) => ({
                value: item.id,
                label: item.nome,
              })}
            />
          );
        }}
      />

      {/* <AppContainer>
        <View className="flex flex-1">
          {isPending && <Text>Loading...</Text>}
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
      </AppContainer> */}
    </>
  );
}
