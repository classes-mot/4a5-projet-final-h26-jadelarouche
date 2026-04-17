import { NavLink } from "react-router-dom";

import "./NavLinks.css";
//import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const NavLinks = () => {
  /*const auth = useContext(AuthContext);
  const navigate = useNavigate();*/

  /*const handleLogout = () => {
    auth.logout();
    navigate("/accueil");
  };*/

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/accueil">Accueil</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
