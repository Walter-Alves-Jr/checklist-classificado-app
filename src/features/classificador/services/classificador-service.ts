import { aplicarMapa, buildHTML, foraTipo } from "../helpers";
import { buildReportFileName } from "../helpers/build-report-filename";
import { ResultadoClassificacao } from "../types/classificacao-response.type";
import {
  IClassificacaoRequest,
  IClassificacaoResponse,
} from "../types/classificacao.type";

import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export function classificarMAPA(
  d: IClassificacaoRequest,
): ResultadoClassificacao | undefined {
  const mapa = aplicarMapa(d);
  const regra = mapa[d.cultura];

  if (!regra) {
    return foraTipo("Cultura inválida");
  }

  return regra();
}

export async function generateClassificationPDF(data: IClassificacaoResponse) {
  if (!data) {
    throw new Error("Dados inválidos para gerar PDF.");
  }

  try {
    const html = buildHTML(data);
    const { uri } = await Print.printToFileAsync({ html });
    const fileName = buildReportFileName(data.cultura);
    const newPath = FileSystem.documentDirectory + fileName;

    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newPath);
    }

    return {
      uri: newPath,
      fileName,
    };
  } catch {
    console.error("Erro ao gerar PDF");
    throw new Error("Falha ao gerar relatório.");
  }
}
