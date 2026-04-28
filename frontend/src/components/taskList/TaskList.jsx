import Task from "../task/Task";

const TaskList = ({ tasks, view, onModifier, onSupprimer }) => {
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

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

  // Trier les tâches par heure de début
  const sortByTime = (taskList) =>
    [...taskList].sort((a, b) => {
      if (!a.heureDebut) return 1;
      if (!b.heureDebut) return -1;
      return a.heureDebut.localeCompare(b.heureDebut);
    });

  const today = getToday();
  const weekDates = getWeekDates();

  // Filtrage amélioré avec logs pour debug
  console.log("TaskList - today:", today);
  console.log("TaskList - tasks reçues:", tasks.length);
  console.log(
    "TaskList - dates des tâches:",
    tasks.map((t) => t.date),
  );

  const groupedTasks =
    view === "aujourdhui"
      ? {
          [today]: sortByTime(
            tasks.filter((t) => {
              console.log(
                `Comparaison: t.date="${t.date}" === today="${today}" ?`,
                t.date === today,
              );
              return t.date === today;
            }),
          ),
        }
      : weekDates.reduce((acc, d) => {
          acc[d] = sortByTime(tasks.filter((t) => t.date === d));
          return acc;
        }, {});

  return (
    <div
      className={`days-container & ${view === "semaine" ? "semaine-layout" : ""}`}
    >
      {Object.entries(groupedTasks).map(([date, dayTasks]) => (
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
                  onModifier={onModifier}
                  onSupprimer={onSupprimer}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
