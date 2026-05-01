import express from "express";
import { register, login, getProfile } from "../controllers/userController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Routes publiques
router.post("/register", register); //Inscription
router.post("/login", login); //Connexion

// Routes protégées
router.get("/profile", protect, getProfile); // Obtenir son profil

export default router;
