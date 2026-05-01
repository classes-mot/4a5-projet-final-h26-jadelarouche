import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // Charge les fichiers JSON depuis /public/locales
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Intégration React
  .init({
    lng: "fr", // Langue par défaut
    fallbackLng: "en", // Langue de secours
    debug: true,
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
  });

// Met à jour l'attribut lang de la balise <html>
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
