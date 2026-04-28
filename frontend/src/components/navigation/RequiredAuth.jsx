import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const RequiredAuth = () => {
  const { isLoggedIn } = useContext(AuthContext);

  // Si l'utilisateur n'est pas connecté - on le redirige vers la page de connexion
  if (!isLoggedIn) {
    return <Navigate to={"/connexion"} replace />;
  }

  // Si l'utilisateur est connecté - On affiche la page demandée
  return <Outlet />;
};

export default RequiredAuth;
