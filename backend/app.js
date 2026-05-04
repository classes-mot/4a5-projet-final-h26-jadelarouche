import express from "express";
import connectDB from "./util/db.js";
import userRoutes from "./routes/usersRoutes.js";
import tacheRoutes from "./routes/tachesRoutes.js";
import "dotenv/config";
import cors from "cors";

// Middleware pour passer le JSON
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://foura5-projet-final-h26-jadelarouche.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Connexion a la base de données
connectDB();

// Définition des routes
app.use("/api/users", userRoutes);
app.use("/api/taches", tacheRoutes);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

//Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server démarré sur le port ${PORT}`);
});

export default app;
