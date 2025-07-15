import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-react-native-language-detector";

import en from "./locales/en/translation.json";
import ja from "./locales/ja/translation.json";
import uz from "./locales/uz/translation.json";

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ja",
    resources: {
      en: { translation: en },
      ja: { translation: ja },
      uz: { translation: uz },
    },
    interpolation: {
      escapeValue: false, // not needed for React
    },
  });

export default i18n;
