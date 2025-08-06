import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./locales/en/translation.json";
import ja from "./locales/ja/translation.json";
import uz from "./locales/uz/translation.json";

const fallbackLng = "en";
const supportedLngs = ["en", "ja", "uz"];

const getDeviceLanguage = () => {
  const locales = Localization.getLocales();

  if (locales && locales.length > 0) {
    const deviceLng = locales[0].languageCode;

    if (deviceLng && supportedLngs.includes(deviceLng)) {
      return deviceLng;
    }
  }

  return fallbackLng;
};

i18n.use(initReactI18next).init({
  lng: getDeviceLanguage(),
  fallbackLng,
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    uz: { translation: uz },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
