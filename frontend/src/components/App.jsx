import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { useState } from "react";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
