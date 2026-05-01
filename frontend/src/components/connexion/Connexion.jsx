import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Connexion.css";
import { AuthContext } from "../context/auth-context";
import { useTranslation } from "react-i18next";

export default function Connexion() {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // Pour afficher un ,essage d'erreur
  const [error, setError] = useState("");

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();

    const { email, password } = enteredValues;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (foundUser) {
      // Connexion réussie
      auth.login(foundUser);

      setError("");
      navigate("/");
    } else {
      // Connexion échouée
      setError("connexion.erreur");
    }
  };
  return (
    <div className="connexion-wrapper">
      <form onSubmit={authSubmitHandler} className="connexion-form">
        <h2>{t("connexion.titre")}</h2>
        {error && <p className="control-error">{t(error)}</p>}

        <div className="control-row">
          <label htmlFor="email">{t("connexion.email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
            required
          />
        </div>

        <div className="control-row">
          <label htmlFor="password">{t("connexion.motDePasse")}</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-connexion">
            {t("connexion.seConnecter")}
          </button>
        </div>

        <p>
          {t("connexion.pasDeCompte")}{" "}
          <Link to="/inscription" style={{ color: "#4a90e2" }}>
            {t("connexion.sInscrire")}
          </Link>
        </p>
      </form>
    </div>
  );
}
