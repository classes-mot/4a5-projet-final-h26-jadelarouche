import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("fr")}
        className={`lang-btn ${i18n.language === "fr" ? "active" : ""}`}
      >
        FR
      </button>
      <span className="lang-separator">|</span>
      <button
        onClick={() => changeLanguage("en")}
        className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
      >
        EN
      </button>
    </div>
  );
}
