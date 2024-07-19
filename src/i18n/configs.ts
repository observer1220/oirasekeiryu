import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishText from "./en.json";
import mandarinText from "./zh.json";

const resources = {
  en: {
    translation: englishText,
  },
  zh: {
    translation: mandarinText,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  interpolation: {
    // React本身就具有防止XSS攻擊的機制，所以不需要進行escape
    escapeValue: false,
  },
});

export default i18n;
