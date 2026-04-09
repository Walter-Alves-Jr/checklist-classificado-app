import { useArmazensQuery } from "@/src/features/armazens/hooks/storage/queries/use-armazens-query";
import { useChecklistArmazemQuery } from "@/src/features/checklists/hooks/queries/use-checklist-armazem-query";
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
  checklistId: z.number().min(1, "Selecione um checklist."),
});

type ArmazemSchema = z.infer<typeof armazemSchema>;

export default function Armazens() {
  const { control, watch } = useForm<ArmazemSchema>({
    resolver: zodResolver(armazemSchema),
    defaultValues: {
      armazemId: 0,
      checklistId: 0,
    },
  });
  const armazemId = watch("armazemId");

  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search);
  const { data, isLoading } = useArmazensQuery(searchDebounced);

  const { data: checklists, isLoading: isLoadingChecklist } =
    useChecklistArmazemQuery(Number(armazemId));

  function goBack() {
    router.back();
  }

  return (
    <>
      <HeaderPage goBack={goBack} title="Checklist" />

      <Controller
        control={control}
        name="armazemId"
        render={({ field }) => {
          return (
            <AppDropdown
              filterable
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

      <Controller
        control={control}
        name="checklistId"
        render={({ field }) => {
          return (
            <AppDropdown
              placeholder="Selecionar Checklist"
              value={field.value}
              onChange={field.onChange}
              data={checklists ?? []}
              loading={isLoadingChecklist}
              disabled={!armazemId}
              options={(item) => ({
                value: item.id,
                label: item.nome,
              })}
            />
          );
        }}
      />
    </>
  );
}
