import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ mode = "ajouter", initialValues = {}, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    date: initialValues.date || "",
    description: initialValues.description || "",
    heureDebut: initialValues.heureDebut || "",
    heureFin: initialValues.heureFin || "",
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formValues);
  };

  const isAjouter = mode === "ajouter";

  return (
    <div className="task-form-wrapper">
      <form onSubmit={handleSubmit} className="task-form">
        <h2>{isAjouter ? "Ajouter à l'horaire" : "Modifier à l'horaire"}</h2>

        <div className="task-control-row">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={formValues.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>

        <div className="task-control-row">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </div>

        <div className="task-control-row">
          <label htmlFor="heureDebut">Heure de début</label>
          <input
            type="time"
            id="heureDebut"
            value={formValues.heureDebut}
            onChange={(e) => handleChange("heureDebut", e.target.value)}
            required
          />
        </div>

        <div className="task-control-row">
          <label htmlFor="heureFin">Heure de fin</label>
          <input
            type="time"
            id="heureFin"
            value={formValues.heureFin}
            onChange={(e) => handleChange("heureFin", e.target.value)}
            required
          />
        </div>

        <div className="task-form-actions">
          <button type="submit" className="btn-task">
            {isAjouter ? "Ajouter" : "Modifier"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
