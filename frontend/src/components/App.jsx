import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./containers/Roots";
import RequiredAuth from "./navigation/RequiredAuth";

import ErreurPage from "./pages/ErreurPage";
import Accueil from "./pages/Accueil";
import Connexion from "./connexion/Connexion";
import Inscription from "./inscription/Inscription";
import TaskForm from "./taskForm/TaskForm";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";

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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
