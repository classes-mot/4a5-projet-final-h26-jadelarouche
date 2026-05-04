import { createContext } from "react";

export const API_BASE_URL = (
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
)
  .replace(/\/$/, "")
  .replace(/\/api\/?$/, "");

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});
