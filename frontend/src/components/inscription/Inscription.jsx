import { useState } from "react";
import "./Inscription.css";
import { Link } from "react-router-dom";

export default function Inscription() {
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

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
      alert("Cet emai; est déjà utilisée.");
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
        <h2>Inscription</h2>

        <div className="control-row">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input id="username" type="text" name="username" required />
        </div>

        <div className="control-row">
          <label htmlFor="email">Adresse courriel</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="control-row">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" name="password" required />
        </div>

        {passwordAreNotEqual && (
          <p className="control-error">
            Les mots de passe ne sont pas identiques.
          </p>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-inscription">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
