import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "./context/auth-context";

import Root from "./containers/Roots";
import RequiredAuth from "./navigation/RequiredAuth";

import ErreurPage from "./pages/ErreurPage";
import Accueil from "./pages/Accueil";
import Connexion from "./connexion/Connexion";
import Inscription from "./inscription/Inscription";
import TaskForm from "./taskForm/TaskForm";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErreurPage />,
    children: [
      { path: "", element: <Accueil /> },
      { path: "accueil", element: <Accueil /> },
      { path: "/connexion", element: <Connexion /> },
      { path: "/inscription", element: <Inscription /> },

      // Routes PROTÉGÉES
      {
        element: <RequiredAuth />,
        children: [
          { path: "/add", element: <TaskForm /> },
          { path: "/edit/:id", element: <TaskForm /> },
        ],
      },
    ],
  },
]);

const App = () => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrentUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: currentUser,
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
