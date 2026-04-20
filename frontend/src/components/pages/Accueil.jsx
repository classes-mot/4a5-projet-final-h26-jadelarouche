import "./Accueil.css";

const Accueil = () => {
  return (
    <div className="accueil-container">
      <div className="sidebar">
        <h2>Agenda</h2>
        <ul>
          <li className="active">Aujourd'hui</li>
          <li>Semaine</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="today-card">
          <h3>Aujourd'hui</h3>
          <div className="time-slots">
            {[
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
            ].map((time) => (
              <div key={time} className="time-slot">
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
