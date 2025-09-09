// generatePdf.ts
import { Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import pdfContent from "./PDF_HTML_Content";

export const generatePdf = async (data: any) => {
  try {
    let base64Image: string | null = null;

    const getBase64Image = async (uri: string): Promise<string> => {
      const base64String = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64String}`;
    };

    const getBase64FromAsset = async (imageModule: number): Promise<string> => {
      const asset = Asset.fromModule(imageModule);
      await asset.downloadAsync();

      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return `data:image/jpeg;base64,${base64}`;
    };

    if (data.imageUri) {
      base64Image = await getBase64Image(data.imageUri);
    } else {
      base64Image = await getBase64FromAsset(require("../public/user.jpeg"));
    }

    // Build HTML for PDF
    const htmlContent = pdfContent({ ...data, base64Image });

    // Generate PDF
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Share the file (user can save/export)
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("PDF Generated", `File saved temporarily at: ${uri}`);
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    Alert.alert("Error", "Failed to generate PDF");
  }
};
