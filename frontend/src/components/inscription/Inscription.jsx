import { useState } from "react";
import "./Inscription.css";
import { Link } from "react-router-dom";

export default function Inscription() {
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

  function handleSubmit(e) {
    event.preventDefault();

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

    console.log("Utilisateur inscrit :", newUser);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inscription</h1>

      <div className="control-row">
        <div className="control">
          <label htmlFor="email">Courriel</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="control">
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          {passwordAreNotEqual ? (
            <div className="control-error">
              <p>Le mot de passe doit être identique.</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="control row">
        <div className="control">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input id="username" type="text" name="username" required />
        </div>
      </div>

      <p className="form-actions">
        <Link to="/login">
          <button className="button button-flat">Se connecter</button>
        </Link>
        <button type="submit" className="button">
          S'inscrire
        </button>
      </p>
    </form>
  );
}
