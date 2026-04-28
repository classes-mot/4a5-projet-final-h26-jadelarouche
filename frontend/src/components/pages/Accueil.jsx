import { useState, useContext, useEffect, useRef } from "react";
import "./Accueil.css";
import Modal from "../context/Modal";
import TaskForm from "../taskForm/TaskForm";
import TaskList from "../taskList/TaskList";
import { AuthContext } from "../context/auth-context";

const Accueil = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [view, setView] = useState("aujourdhui");
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToedit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasks, setTasks] = useState([]);

  //Utilisation d'un ref
  const isInitialized = useRef(false);

  // Charger les tâches quand l'utilisateur change (login/logout)
  useEffect(() => {
    if (!isLoggedIn || !user?.email) {
      setTasks([]);
      isInitialized.current = false;
      return;
    }

    const key = `tasks_${user.email}`;
    try {
      const saved = localStorage.getItem(key);
      const parsed = saved ? JSON.parse(saved) : [];

      console.log(`Tâches chargées depuis localStorage`);
      console.table(parsed);

      setTasks(parsed);
      isInitialized.current = true;
    } catch (e) {
      console.error("Erreur lors du chargement des tâches :", e);
      setTasks([]);
    }
  }, [isLoggedIn, user?.email]);

  // Sauvegarder les tâches dans localStorage à chaque modification
  useEffect(() => {
    if (!isLoggedIn || !user?.email || !isInitialized.current) return;

    // Protection ne pas sauvegarder si le tableau est vide
    if (tasks.length === 0) {
      console.log("Sauvegarde ignorée");
      return;
    }

    const key = `tasks_${user.email}`;
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
      console.log(`Sauvegarde effectué`);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde des tâches :", e);
    }
  }, [tasks, isLoggedIn, user?.email]);

  const handleAjouter = (formValues) => {
    console.log("Ajout tache");
    const newTask = { id: Date.now(), ...formValues };
    setTasks((prev) => [...prev, newTask]);
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
          {isLoggedIn && (
            <button
              className="btn-nouvelle-tache"
              onClick={handleNouvelleClick}
            >
              Nouvelle Tâche
            </button>
          )}

          <nav className="sidebar-nav">
            <div
              className={`sidebar-nav-item ${view === "aujourdhui" ? "active" : ""}`}
              onClick={() => setView("aujourdhui")}
            >
              Aujourd'hui
            </div>
            <div
              className={`sidebar-nav-item ${view === "semaine" ? "active" : ""}`}
              onClick={() => setView("semaine")}
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
            <TaskList
              tasks={tasks}
              view={view}
              onModifier={handleModifier}
              onSupprimer={handleSupprimerClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Accueil;
