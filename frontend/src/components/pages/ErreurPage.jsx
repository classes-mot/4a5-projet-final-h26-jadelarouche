import SideDrawer from "../navigation/SideDrawer";
import NavLinks from "../navigation/NavLinks";
import MainNavigation from "../navigation/MainNavigation";
import { useTranslation } from "react-i18next";

const ErreurPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainNavigation />

      <main>
        <h1>{t("erreur.titre")}</h1>
        <p>{t("erreur.message")}</p>
      </main>
    </>
  );
};

export default ErreurPage;
