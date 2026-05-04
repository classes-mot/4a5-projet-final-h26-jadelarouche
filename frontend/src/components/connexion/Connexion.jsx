import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Connexion.css";
import { AuthContext, API_BASE_URL } from "../context/auth-context";
import { useTranslation } from "react-i18next";

export default function Connexion() {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // Pour afficher un ,essage d'erreur
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredValues.email,
          motDePasse: enteredValues.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // data devrait contenir user et token
      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="connexion-wrapper">
      <form onSubmit={authSubmitHandler} className="connexion-form">
        <h2>{t("connexion.titre")}</h2>
        {error && <p className="control-error">{t("connexion.erreur")}</p>}

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
          <button type="submit" className="btn-connexion" disabled={loading}>
            {loading ? "Connexion..." : t("connexion.seConnecter")}
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
