import { useNomeArmazemQueryData } from "@/src/features/armazens/hooks/storage/queries/queryData/useNomeArmazemQueryData";
import { useChecklistResponse } from "@/src/features/checklists/hooks/mutations/useChecklistResponse";
import { usePerguntasChecklistQuery } from "@/src/features/perguntas/hooks/storage/queries/use-perguntas-checklist-query";
import { AppButton } from "@/src/shared/components/Button";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper/screen-wrapper";
import AppText from "@/src/shared/components/Text/AppText";
import { useToast } from "@/src/shared/components/Toast";
import { app_colors } from "@/src/shared/consts";
import { useGps } from "@/src/shared/hooks/useGps";
import { useBrand } from "@/src/theme/useBrand";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { z } from "zod";
import { useNomeChecklistQueryData } from "../hooks/queries/data/use-nome-checklist-query-data";
import Pergunta from "./pergunta";
import { PerguntaSkeleton } from "./pergunta-skeleton";

type ChecklistPerguntasType = {
  checklistId: number;
  armazemId: number;
  search?: string; // Para filtrar nome do armazem selecionado no query-data do react-query, quando houver filtro de busca.
};

const checklistSchema = z.object({
  respostas: z.record(
    z.string(),
    z.preprocess(
      (val) => (val === "true" ? true : val === "false" ? false : val),
      z.boolean("Marque uma opção"),
    ),
  ),
});

type ChecklistFormData = z.input<typeof checklistSchema>;

export default function CheklistPerguntas({
  armazemId,
  checklistId,
  search,
}: ChecklistPerguntasType) {
  const brand = useBrand();
  const { show } = useToast();
  const { data: gpsResult } = useGps();

  const {
    data: perguntasChecklist,
    isPending,
    isError,
  } = usePerguntasChecklistQuery(Number(checklistId));

  const { mutateAsync: responder, isPending: isPendingChecklistResponse } =
    useChecklistResponse();

  const { nomeChecklistSelecionado } = useNomeChecklistQueryData({
    checklistId: Number(checklistId),
    armazemId: Number(armazemId),
  });

  const { nomeArmazem } = useNomeArmazemQueryData({
    armazemId: Number(armazemId),
    search,
  });

  const { control, handleSubmit, watch } = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistSchema),
    defaultValues: { respostas: {} },
  });
  const respostas = watch("respostas");

  const handleResponder = async () => {
    if (!respostas || !nomeChecklistSelecionado || !nomeArmazem) return;

    if (!gpsResult?.coords)
      return alert("Informe sua localização para gerar o relatório!");

    const { latitude, longitude } = gpsResult?.coords;

    const dados = {
      checklistName: nomeChecklistSelecionado,
      armazemName: nomeArmazem,
      fotos: [],
      data: new Date().toISOString(),
      gps: `${latitude}, ${longitude}`,
      respostas,
    };

    await responder(dados);
    goBack();

    show({
      title: "Relatório gerado com sucesso!",
    });
  };

  function goBack() {
    router.back();
  }

  if (isPending) return <PerguntaSkeleton />;

  if (isError)
    return (
      <View className="items-center p-10">
        <AppText variant="secondary">
          Erro ao obter perguntas. Tente novamente.
        </AppText>
      </View>
    );

  return (
    <>
      <ScreenWrapper>
        <FlatList
          data={perguntasChecklist}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <AppText
              className="mb-5 text-xl"
              style={{ color: app_colors.text.secondary }}
            >
              Responda as perguntas abaixo
            </AppText>
          )}
          renderItem={({ item }) => (
            <Pergunta
              item={item}
              control={control}
              colors={app_colors}
              brandColor={brand.background.primary.backgroundColor}
            />
          )}
          ListFooterComponent={() => (
            <AppButton
              useTheme={true}
              onPress={handleSubmit(handleResponder)}
              className="mt-4 flex items-center justify-center"
              loading={isPendingChecklistResponse}
              disabled={isPendingChecklistResponse}
            >
              <AppButton.Text className="text-lg font-bold text-white">
                Enviar Respostas
              </AppButton.Text>
            </AppButton>
          )}
        />
      </ScreenWrapper>
    </>
  );
}
