import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "./Task.css";

const Task = ({ task, onModifier, onSupprimer }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="task-card">
      <h3 className="task-title">{task.description}</h3>

      <div className="task-time">
        <span>{task.heureDebut}</span>
        <span className="task-separator">à</span>
        <span>{task.heureFin}</span>
      </div>
      {isLoggedIn && (
        <div className="task-actions">
          <button className="btn-modifier" onClick={() => onModifier(task)}>
            Modifier
          </button>
          <button
            className="btn-supprimer"
            onClick={() => onSupprimer(task.id)}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
};
export default Task;
