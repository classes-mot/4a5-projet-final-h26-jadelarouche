import { NavLink, useNavigate } from "react-router-dom";
import "./NavLinks.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useTranslation } from "react-i18next";

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/accueil");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink
          to="/accueil"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {t("navigation.accueil")}{" "}
        </NavLink>
      </li>

      {isLoggedIn ? (
        <li>
          <NavLink
            to="/accueil"
            onClick={handleLogout}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("navigation.deconnexion")}
          </NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink
              to="/connexion"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("navigation.connexion")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inscription"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("navigation.inscription")}
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
