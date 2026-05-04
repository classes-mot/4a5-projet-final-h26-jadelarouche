import { useState, useContext, useEffect, useCallback } from "react";
import "./Accueil.css";
import Modal from "../context/Modal";
import TaskForm from "../taskForm/TaskForm";
import TaskList from "../taskList/TaskList";
import { AuthContext, API_BASE_URL } from "../context/auth-context";
import { useTranslation } from "react-i18next";

const Accueil = () => {
  const { t } = useTranslation();
  const { isLoggedIn, token } = useContext(AuthContext);

  const [view, setView] = useState("aujourdhui");
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les tâches depuis l'API
  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/taches`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        console.error("Erreur serveur:", res.status);
      }
    } catch (error) {
      console.error("Erreur chargement tâches:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Charger les tâches quand l'utilisateur change (login/logout)
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isLoggedIn, token, fetchTasks]);

  const handleAjouter = async (formValues) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/taches`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        fetchTasks();
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModifier = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleUpdateTask = async (formValues) => {
    if (!taskToEdit) return;
    try {
      const taskId = taskToEdit._id || taskToEdit.id;
      const res = await fetch(`${API_BASE_URL}/api/taches/${taskId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        fetchTasks();
        setShowForm(false);
        setTaskToEdit(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSupprimerClick = (id) => {
    setTaskToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/taches/${taskToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleNouvelleClick = () => {
    setTaskToEdit(null);
    setShowForm(true);
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("modal.titre")}
        message={t("modal.message")}
      />

      <div className="accueil-container">
        <div className="sidebar">
          <h2 className="sidebar-title">{t("accueil.titre")}</h2>
          {isLoggedIn && (
            <button
              className="btn-nouvelle-tache"
              onClick={handleNouvelleClick}
            >
              {t("accueil.nouvelleTache")}
            </button>
          )}

          <nav className="sidebar-nav">
            <div
              className={`sidebar-nav-item ${view === "aujourdhui" ? "active" : ""}`}
              onClick={() => setView("aujourdhui")}
            >
              {t("accueil.aujourdhui")}
            </div>
            <div
              className={`sidebar-nav-item ${view === "semaine" ? "active" : ""}`}
              onClick={() => setView("semaine")}
            >
              {t("accueil.semaine")}
            </div>
          </nav>
        </div>

        <div className="main-content">
          {showForm ? (
            <TaskForm
              mode={taskToEdit ? "modifier" : "ajouter"}
              initialValues={taskToEdit || {}}
              onSubmit={taskToEdit ? handleUpdateTask : handleAjouter}
              onCancel={() => {
                setShowForm(false);
                setTaskToEdit(null);
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
