// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import frTranslation from "./locales/fr/common.json";
import enTranslation from "./locales/en/common.json";

const resources = {
  fr: { translation: frTranslation },
  en: { translation: enTranslation },
};

i18n
  .use(LanguageDetector) // détecte automatiquement la langue du navigateur
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    interpolation: {
      escapeValue: false, // React gère déjà l'échappement
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
