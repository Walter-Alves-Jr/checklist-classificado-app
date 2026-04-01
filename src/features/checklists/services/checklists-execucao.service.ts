import { buildPdfChecklist } from "../helpers/buil-pdf-checklist.helper";

import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { buildReportFileName } from "../../classificador/helpers/build-report-filename";

export async function generateChecklistPDF(data: any) {
  if (!data) {
    throw new Error("Dados inválidos para gerar PDF.");
  }

  try {
    const html = buildPdfChecklist(data);
    const { uri } = await Print.printToFileAsync({ html });
    const fileName = buildReportFileName(data.checklistName);
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
  } catch (error) {
    console.error("Erro ao gerar PDF", error);
    throw new Error("Falha ao gerar relatório.");
  }
}
