import { toLowerNoAccentAndSpace } from "@/src/shared/utils";
import { formatDate } from "./format-date";

export function buildReportFileName(cultura: string) {
  return `relatorio_classificacao_${toLowerNoAccentAndSpace(
    cultura,
  )}_${formatDate({ withTime: true, withSeconds: true })}.pdf`;
}
