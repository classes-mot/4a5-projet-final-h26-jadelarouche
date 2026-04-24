import { NavLink, useNavigate } from "react-router-dom";
import "./NavLinks.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/accueil");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink
          to="/accueil"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Accueil{" "}
        </NavLink>
      </li>

      {isLoggedIn ? (
        <>
          <li>
            <NavLink
              to="/accueil"
              onClick={handleLogout}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Déconnexion
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/connexion"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Connexion
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inscription"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inscription
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
