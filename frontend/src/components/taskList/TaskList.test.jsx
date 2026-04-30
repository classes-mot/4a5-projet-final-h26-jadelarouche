import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import TaskList from "./TaskList";

// ─── Mock du composant Task pour isoler TaskList ──────────────────────────────
// On remplace Task par une version ultra-simple pour tester uniquement TaskList
vi.mock("../task/Task", () => ({
  default: ({ task }) => (
    <div>
      <p>{task.description}</p>
      <span>{task.heureDebut}</span>
    </div>
  ),
}));

// ─── Données de test ──────────────────────────────────────────────────────────

// Obtenir la date d'aujourd'hui au format YYYY-MM-DD (même logique que TaskList)
const getToday = () => new Date().toISOString().split("T")[0];

const today = getToday();

const mockTasks = [
  {
    id: "1",
    description: "Tâche du matin",
    heureDebut: "08:00",
    heureFin: "09:00",
    date: today,
  },
  {
    id: "2",
    description: "Tâche de l'après-midi",
    heureDebut: "14:00",
    heureFin: "15:00",
    date: today,
  },
  {
    id: "3",
    description: "Tâche d'une autre journée",
    heureDebut: "10:00",
    heureFin: "11:00",
    date: "2000-01-01", // date dans le passé — ne devrait pas apparaître aujourd'hui
  },
];

// ─── Suite de tests ───────────────────────────────────────────────────────────
describe("Composant TaskList", () => {
  // --- Vue AUJOURD'HUI ---

  it("affiche 'Aucune tâche' si aucune tâche pour aujourd'hui", () => {
    // Arrange + Act
    render(
      <TaskList
        tasks={[]}
        view="aujourdhui"
        onModifier={vi.fn()}
        onSupprimer={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText("Aucune tâche")).toBeInTheDocument();
  });

  it("affiche uniquement les tâches d'aujourd'hui en vue 'aujourdhui'", () => {
    render(
      <TaskList
        tasks={mockTasks}
        view="aujourdhui"
        onModifier={vi.fn()}
        onSupprimer={vi.fn()}
      />,
    );

    // Les 2 tâches d'aujourd'hui doivent apparaître
    expect(screen.getByText("Tâche du matin")).toBeInTheDocument();
    expect(screen.getByText("Tâche de l'après-midi")).toBeInTheDocument();

    // La tâche d'une autre journée NE doit PAS apparaître
    expect(
      screen.queryByText("Tâche d'une autre journée"),
    ).not.toBeInTheDocument();
  });

  it("affiche le label 'Aujourd'hui' pour la colonne du jour courant", () => {
    render(
      <TaskList
        tasks={mockTasks}
        view="aujourdhui"
        onModifier={vi.fn()}
        onSupprimer={vi.fn()}
      />,
    );

    expect(screen.getByText("Aujourd'hui")).toBeInTheDocument();
  });

  // --- Vue SEMAINE ---

  it("affiche 7 colonnes de jours en vue 'semaine'", () => {
    render(
      <TaskList
        tasks={mockTasks}
        view="semaine"
        onModifier={vi.fn()}
        onSupprimer={vi.fn()}
      />,
    );

    // Il doit y avoir 7 titres de colonnes (h2)
    const dayTitles = screen.getAllByRole("heading", { level: 2 });
    expect(dayTitles.length).toBe(7);
  });

  it("affiche les tâches d'aujourd'hui dans la colonne correspondante en vue semaine", () => {
    render(
      <TaskList
        tasks={mockTasks}
        view="semaine"
        onModifier={vi.fn()}
        onSupprimer={vi.fn()}
      />,
    );

    expect(screen.getByText("Tâche du matin")).toBeInTheDocument();
    expect(screen.getByText("Tâche de l'après-midi")).toBeInTheDocument();
  });
});
