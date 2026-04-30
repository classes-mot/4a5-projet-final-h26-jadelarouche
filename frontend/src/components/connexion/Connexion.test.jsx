import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Connexion from "./Connexion";

// ─── Mock de useNavigate ──────────────────────────────────────────────────────
// Connexion utilise useNavigate → on doit le mocker
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ─── Contexte d'auth simulé ───────────────────────────────────────────────────
const mockLogin = vi.fn();
const mockAuth = {
  isLoggedIn: false,
  user: null,
  login: mockLogin,
  logout: vi.fn(),
};

// ─── Fonction utilitaire ──────────────────────────────────────────────────────
const renderConnexion = () => {
  render(
    <AuthContext.Provider value={mockAuth}>
      <MemoryRouter>
        <Connexion />
      </MemoryRouter>
    </AuthContext.Provider>,
  );
};

// ─── Suite de tests ───────────────────────────────────────────────────────────
describe("Composant Connexion", () => {
  beforeEach(() => {
    // Réinitialiser les mocks et le localStorage avant chaque test
    vi.clearAllMocks();
    localStorage.clear();
  });

  // --- Affichage ---

  it("affiche le formulaire de connexion", () => {
    renderConnexion();

    expect(
      screen.getByRole("heading", { name: "Connexion" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Se connecter" }),
    ).toBeInTheDocument();
  });

  // --- Connexion RÉUSSIE ---

  it("appelle auth.login et redirige si les identifiants sont corrects", () => {
    // Arrange — simuler un utilisateur dans le localStorage
    const users = [
      { email: "user@test.com", password: "1234", username: "Tester" },
    ];
    localStorage.setItem("users", JSON.stringify(users));

    renderConnexion();

    // Act — remplir le formulaire
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: "user@test.com",
      password: "1234",
      username: "Tester",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // --- Connexion ÉCHOUÉE ---

  it("affiche un message d'erreur si les identifiants sont incorrects", () => {
    // Arrange — aucun utilisateur dans le localStorage
    localStorage.setItem("users", JSON.stringify([]));

    renderConnexion();

    // Act
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "mauvais@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "mauvais" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    // Assert
    expect(
      screen.getByText("Email ou mot de passe incorrect."),
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("n'appelle PAS navigate si la connexion échoue", () => {
    localStorage.setItem("users", JSON.stringify([]));

    renderConnexion();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "inexistant@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
