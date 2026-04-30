import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { AuthContext } from "../context/auth-context";
import Task from "./Task";

// ─── Données de test réutilisables ───────────────────────────────────────────
const mockTask = {
  id: "t1",
  description: "Réunion équipe",
  heureDebut: "09:00",
  heureFin: "10:00",
  date: "2025-05-01",
};

// ─── Contextes simulés ────────────────────────────────────────────────────────
const mockAuthLoggedIn = {
  isLoggedIn: true,
  user: { email: "test@test.com" },
  login: vi.fn(),
  logout: vi.fn(),
};

const mockAuthLoggedOut = {
  isLoggedIn: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
};

// ─── Fonction utilitaire pour rendre avec contexte ───────────────────────────
const renderTask = (authContext, taskProps = {}) => {
  const onModifier = vi.fn();
  const onSupprimer = vi.fn();

  render(
    <AuthContext.Provider value={authContext}>
      <Task
        task={{ ...mockTask, ...taskProps }}
        onModifier={onModifier}
        onSupprimer={onSupprimer}
      />
    </AuthContext.Provider>,
  );

  return { onModifier, onSupprimer };
};

// ─── Suite de tests ───────────────────────────────────────────────────────────
describe("Composant Task", () => {
  // --- ARRANGE / ACT / ASSERT : affichage de base ---

  it("affiche la description de la tâche", () => {
    // Arrange + Act
    renderTask(mockAuthLoggedOut);

    // Assert
    expect(screen.getByText("Réunion équipe")).toBeInTheDocument();
  });

  it("affiche les heures de début et de fin", () => {
    renderTask(mockAuthLoggedOut);

    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  // --- Utilisateur NON connecté ---

  it("n'affiche PAS les boutons Modifier et Supprimer si non connecté", () => {
    renderTask(mockAuthLoggedOut);

    expect(screen.queryByText("Modifier")).not.toBeInTheDocument();
    expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
  });

  // --- Utilisateur connecté ---

  it("affiche les boutons Modifier et Supprimer si connecté", () => {
    renderTask(mockAuthLoggedIn);

    expect(screen.getByText("Modifier")).toBeInTheDocument();
    expect(screen.getByText("Supprimer")).toBeInTheDocument();
  });

  it("appelle onModifier avec la tâche quand on clique Modifier", () => {
    const { onModifier } = renderTask(mockAuthLoggedIn);

    fireEvent.click(screen.getByText("Modifier"));

    expect(onModifier).toHaveBeenCalledWith(mockTask);
  });

  it("appelle onSupprimer avec l'id de la tâche quand on clique Supprimer", () => {
    const { onSupprimer } = renderTask(mockAuthLoggedIn);

    fireEvent.click(screen.getByText("Supprimer"));

    expect(onSupprimer).toHaveBeenCalledWith("t1");
  });
});
