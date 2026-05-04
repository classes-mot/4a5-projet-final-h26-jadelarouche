import { useState } from "react";
import "./Inscription.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, API_BASE_URL } from "../context/auth-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function Inscription() {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordAreNotEqual(false);

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    if (data.password !== data.confirmPassword) {
      setPasswordAreNotEqual(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.username,
          email: data.email,
          motDePasse: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "erreur lors de l'inscription");
      }

      // Connecter directement l'utilisateur
      if (result.user && result.token) {
        login(result.user, result.token);
        navigate("/accueil");
      } else {
        // Rediriger vers la connexion
        alert(t("inscription.succes"));
        navigate("/connexion");
      }

      e.target.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inscription-wrapper">
      <form onSubmit={handleSubmit} className="inscription-form">
        <h2>{t("inscription.titre")}</h2>

        {error && <p className="control-error">{error}</p>}

        <div className="control-row">
          <label htmlFor="username">{t("inscription.nomUtilisateur")}</label>
          <input id="username" type="text" name="username" required />
        </div>

        <div className="control-row">
          <label htmlFor="email">{t("inscription.email")}</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="control-row">
          <label htmlFor="password">{t("inscription.motDePasse")}</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div className="control-row">
          <label htmlFor="confirmPassword">
            {t("inscription.confirmation")}
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
          />
        </div>

        {passwordAreNotEqual && (
          <p className="control-error">{t("Inscription.erreurMotDePasse")}</p>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-inscription" disabled={loading}>
            {loading ? "Inscription en cours..." : t("inscription.sInscrire")}
          </button>
        </div>

        <p>
          Déjà un compte ?{" "}
          <Link to="/connexion">{t("connexion.seConnecter")}</Link>
        </p>
      </form>
    </div>
  );
}
