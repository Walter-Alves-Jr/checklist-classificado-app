import { useToast } from "@/src/shared/components/Toast";
import { useCallback } from "react";
import { Armazem } from "../types/Armazem";
import { useArmazensServices } from "./use-armazens-services";

export function useArmazens(search: string) {
  const { armazensService } = useArmazensServices();
  const { show } = useToast();

  const obterListaArmazens = useCallback(async (): Promise<
    Armazem[] | null
  > => {
    try {
      const response = await armazensService.obterListaArmazens(search);

      if (!response) {
        show({
          title: "Ops!",
          description: "Nenhum armazem cadastrado.",
          type: "info",
        });

        return null;
      }

      return response;
    } catch {
      show({
        title: "Erro!",
        description: "Ocorreu um erro ao listar armazens.",
        type: "error",
      });
    }
    return null;
  }, [armazensService, show, search]);

  return {
    obterListaArmazens,
  };
}
