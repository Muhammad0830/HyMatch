import { PermissionsAndroid, Platform, Alert } from "react-native";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import pdfContent from "./PDF_HTML_Content";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

async function requestStoragePermission() {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export const generatePdf = async (data: any) => {
  console.log("data", data);
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert(
      "Permission denied",
      "Cannot save PDF without storage permission."
    );
    return;
  }

  let base64Image = null;

  const getBase64Image = async (uri: string): Promise<string> => {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64String}`;
  };

  async function getBase64FromAsset(imageModule: number): Promise<string> {
    const asset = Asset.fromModule(imageModule);
    await asset.downloadAsync();

    const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:image/jpeg;base64,${base64}`;
  }

  if (data.imageUri) {
    base64Image = await getBase64Image(data.imageUri);
  } else {
    base64Image = await getBase64FromAsset(require("../public/user.jpeg"));
  }

  const htmlContent = pdfContent({ ...data, base64Image });

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  await Sharing.shareAsync(uri);
};
