import langEn from "@app/locales/en/translation.json";
import langVi from "@app/locales/vi/translation.json";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: langEn,
  },
  vi: {
    translation: langVi,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "vi",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
