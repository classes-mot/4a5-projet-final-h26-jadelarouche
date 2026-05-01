import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./TaskForm.css";

const TaskForm = ({
  mode = "ajouter",
  initialValues = {},
  onSubmit,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState({
    date: initialValues.date || new Date().toISOString().split("T")[0],
    heureDebut: initialValues.heureDebut || "",
    heureFin: initialValues.heureFin || "",
    description: initialValues.description || "",
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formValues);
  };

  const isAjouter = mode === "ajouter";
  const { t } = useTranslation();

  return (
    <div className="task-form-wrapper">
      <form onSubmit={handleSubmit} className="task-form">
        <h2>
          {isAjouter ? t("taskForm.titreAjouter") : t("taskForm.titreModifier")}
        </h2>

        <div className="task-control-row">
          <label htmlFor="description">{t("taskForm.description")}</label>
          <input
            type="text"
            id="description"
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </div>

        <div className="task-control-row">
          <label htmlFor="date">{t("taskForm.date")}</label>
          <input
            type="date"
            id="date"
            value={formValues.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>

        <div className="task-control-row">
          <label htmlFor="heureDebut">{t("taskForm.heureDebut")}</label>
          <input
            type="time"
            id="heureDebut"
            value={formValues.heureDebut}
            onChange={(e) => handleChange("heureDebut", e.target.value)}
            required
          />
        </div>

        <div className="task-control-row">
          <label htmlFor="heureFin">{t("taskForm.heureFin")}</label>
          <input
            type="time"
            id="heureFin"
            value={formValues.heureFin}
            onChange={(e) => handleChange("heureFin", e.target.value)}
            required
          />
        </div>

        <div className="task-form-actions">
          <button type="button" className="btn-annuler" onClick={onCancel}>
            {t("taskForm.annuler")}
          </button>
          <button type="submit" className="btn-task">
            {isAjouter ? t("taskForm.ajouter") : t("taskForm.modifierBtn")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
