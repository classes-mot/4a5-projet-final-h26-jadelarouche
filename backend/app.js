import express from "express";
import connectDB from "./util/db.js";
import userRoutes from "./routes/usersRoutes.js";
import tacheRoutes from "./routes/tachesRoutes.js";
import "dotenv/config";

// Middleware pour passer le JSON
const app = express();
app.use(express.json());

// Connexion a la base de données
connectDB();

// Définition des routes
app.use("/api/users", userRoutes);
app.use("/api/taches", tacheRoutes);

// Gestion des routes non trouvées
app.use("/{*path}", (req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

//Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server démarré sur le port ${PORT}`);
});

export default app;
