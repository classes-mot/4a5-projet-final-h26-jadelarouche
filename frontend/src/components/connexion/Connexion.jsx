import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Connexion.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function Connexion() {
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
      localStorage.setItem("isLoggedIn", "true");

      setError("");
      navigate("/");
    } else {
      // Connexion échouée
      setError("Email ou mot de passe incorrect.");
    }
  };
  return (
    <div className="connexion-wrapper">
      <form onSubmit={authSubmitHandler} className="connexion-form">
        <h2>Connexion</h2>
        {error && <p className="control-error">{error}</p>}

        <div className="control-row">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Mot de passe</label>
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
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}
