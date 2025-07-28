declare module 'react-native-html-to-pdf' {
  interface PdfOptions {
    html: string;
    fileName: string;
    directory?: string;
    base64?: boolean;
    height?: number;
    width?: number;
    padding?: number;
    bgColor?: string;
  }

  interface PdfResult {
    filePath: string;
    base64?: string;
  }

  const RNHTMLtoPDF: {
    convert: (options: PdfOptions) => Promise<PdfResult>;
  };

  export default RNHTMLtoPDF;
}
