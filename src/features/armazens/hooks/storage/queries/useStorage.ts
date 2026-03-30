import { getStorages } from "@/src/features/armazens/services/armazemService";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

export function useStorage() {
  const storages = useQuery({
    queryKey: ["storages"],
    queryFn: getStorages,
  });

  function selectedStorage(armazemId: number) {
    router.push({
      pathname: "/armazens/[armazemId]",
      params: {
        armazemId: armazemId.toString(),
      },
    });
  }

  return {
    ...storages,
    selectedStorage,
  };
}
