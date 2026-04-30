import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import TaskForm from "./TaskForm";

// ─── Suite de tests ───────────────────────────────────────────────────────────
describe("Composant TaskForm", () => {
  // --- Mode AJOUTER ---

  it("affiche le titre 'Ajouter à l'horaire' en mode ajouter", () => {
    // Arrange + Act
    render(<TaskForm mode="ajouter" onSubmit={vi.fn()} onCancel={vi.fn()} />);

    // Assert
    expect(screen.getByText("Ajouter à l'horaire")).toBeInTheDocument();
  });

  it("affiche le bouton 'Ajouter' en mode ajouter", () => {
    render(<TaskForm mode="ajouter" onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Ajouter" })).toBeInTheDocument();
  });

  // --- Mode MODIFIER ---

  it("affiche le titre 'Modifier à l'horaire' en mode modifier", () => {
    render(<TaskForm mode="modifier" onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByText("Modifier à l'horaire")).toBeInTheDocument();
  });

  it("affiche le bouton 'Modifier' en mode modifier", () => {
    render(<TaskForm mode="modifier" onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Modifier" }),
    ).toBeInTheDocument();
  });

  // --- Pré-remplissage des valeurs initiales ---

  it("pré-remplit les champs avec les valeurs initiales fournies", () => {
    // Arrange
    const initialValues = {
      description: "Cours de React",
      heureDebut: "13:00",
      heureFin: "14:30",
      date: "2025-06-10",
    };

    // Act
    render(
      <TaskForm
        mode="modifier"
        initialValues={initialValues}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByDisplayValue("Cours de React")).toBeInTheDocument();
    expect(screen.getByDisplayValue("13:00")).toBeInTheDocument();
    expect(screen.getByDisplayValue("14:30")).toBeInTheDocument();
  });

  // --- Soumission du formulaire ---

  it("appelle onSubmit avec les valeurs du formulaire à la soumission", () => {
    // Arrange
    const onSubmit = vi.fn();
    render(<TaskForm mode="ajouter" onSubmit={onSubmit} onCancel={vi.fn()} />);

    // Act — remplir les champs
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Nouvelle tâche" },
    });
    fireEvent.change(screen.getByLabelText("Heure de début"), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText("Heure de fin"), {
      target: { value: "11:00" },
    });

    // Act — soumettre
    fireEvent.click(screen.getByRole("button", { name: "Ajouter" }));

    // Assert
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "Nouvelle tâche",
        heureDebut: "10:00",
        heureFin: "11:00",
      }),
    );
  });

  // --- Bouton Annuler ---

  it("appelle onCancel quand on clique sur Annuler", () => {
    // Arrange
    const onCancel = vi.fn();
    render(<TaskForm mode="ajouter" onSubmit={vi.fn()} onCancel={onCancel} />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Annuler" }));

    // Assert
    expect(onCancel).toHaveBeenCalled();
  });
});
