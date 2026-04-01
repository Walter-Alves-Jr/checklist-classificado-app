import { solicitarLocalizacao } from "@/src/shared/services/gpsService";
import { useQuery } from "@tanstack/react-query";

export function useGps() {
  return useQuery({
    queryKey: ["gps"],
    queryFn: async () => {
      return await solicitarLocalizacao();
    },
  });
}
