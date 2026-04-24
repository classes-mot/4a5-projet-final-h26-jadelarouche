import { useState } from "react";
import "./Accueil.css";
import Task from "../task/Task";
import Modal from "../context/Modal";
import TaskForm from "../taskForm/TaskForm";

const getToday = () => new Date().toISOString().split("T")[0];

const getWeekDates = () => {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
};

const formatDayLabel = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  const today = getToday();
  if (dateStr === today) return "Aujourd'hui";
  return date.toLocaleDateString("fr-CA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const Accueil = () => {
  const [view, setView] = useState("aujourdhui");
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToedit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Web et base de données",
      date: getToday(),
      heureDebut: "8:00",
      heureFin: "9:45",
    },
    {
      id: 2,
      description: "Environnement Client/Serveur",
      date: getToday(),
      heureDebut: "9:50",
      heureFin: "10:45",
    },
  ]);

  const handleAjouter = (formValues) => {
    if (taskToEdit) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskToEdit.id ? { ...t, ...formValues } : t)),
      );
      setTaskToedit(null);
    } else {
      setTasks((prev) => [...prev, { id: Date.now(), ...formValues }]);
    }
    setShowForm(false);
  };

  const handleModifier = (task) => {
    setTaskToedit(task);
    setShowForm(true);
  };

  const handleSupprimerClick = (id) => {
    setTaskToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete));
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const handleNouvelleClick = () => {
    setTaskToedit(null);
    setShowForm(true);
  };

  // Filtrage selon la vue
  const today = getToday();
  const weekDates = getWeekDates();

  const filteredByDay =
    view === "aujourdhui"
      ? { [today]: tasks.filter((t) => t.date === today) }
      : weekDates.reduce((acc, d) => {
          acc[d] = tasks.filter((t) => t.date === d);
          return acc;
        }, {});

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer la tâche"
        message="Voulez-vous vraiment supprimer cette tâche?"
      />

      <div className="accueil-container">
        <div className="sidebar">
          <h2 className="sidebar-title">Agenda</h2>
          <button className="btn-nouvelle-tache" onClick={handleNouvelleClick}>
            Nouvelle Tâche
          </button>

          <nav className="sidebar-nav">
            <div
              className={`sidebar-nav-item ${view === "aujourd'hui" ? "active" : ""}`}
              onClick={() => {
                setView("aujourdhui");
              }}
            >
              Aujourd'hui
            </div>
            <div
              className={`sidebar-nav-item ${view === "semaine" ? "active" : ""}`}
              onClick={() => {
                setView("semaine");
              }}
            >
              Semaine
            </div>
          </nav>
        </div>

        <div className="main-content">
          {showForm ? (
            <TaskForm
              mode={taskToEdit ? "modifier" : "ajouter"}
              initialValues={taskToEdit || {}}
              onSubmit={handleAjouter}
              onCancel={() => {
                setShowForm(false);
                setTaskToedit(null);
              }}
            />
          ) : (
            <div
              className={`days-container ${view === "semaine" ? "semaine-layout" : ""}`}
            >
              {Object.entries(filteredByDay).map(([date, dayTasks]) => (
                <div key={date} className="day-column">
                  <h2 className="day-title">{formatDayLabel(date)}</h2>
                  <div className="task-grid">
                    {dayTasks.length === 0 ? (
                      <p className="no-tasks">Aucune tâche</p>
                    ) : (
                      dayTasks.map((task) => (
                        <Task
                          key={task.id}
                          task={task}
                          onModifier={handleModifier}
                          onSuppriner={handleSupprimerClick}
                        />
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accueil;
