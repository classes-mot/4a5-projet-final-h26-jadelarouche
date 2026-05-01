import { useState } from "react";
import "./Inscription.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Inscription() {
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    if (data.password !== data["confirmPassword"]) {
      setPasswordAreNotEqual(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === data.email)) {
      alert(t("inscription.erreurEmail"));
      return;
    }

    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    e.target.reset();
    setPasswordAreNotEqual(false);
  }

  return (
    <div className="inscription-wrapper">
      <form onSubmit={handleSubmit} className="inscription-form">
        <h2>{t("inscription.titre")}</h2>

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
          <button type="submit" className="btn-inscription">
            {t("inscription.sInscrire")}
          </button>
        </div>
      </form>
    </div>
  );
}
