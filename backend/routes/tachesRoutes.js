import express from "express";
import {
  addTache,
  getTaches,
  getTacheById,
  updateTache,
  deleteTache,
} from "../controllers/tacheController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Routes protégées
router.post("/", protect, addTache);
router.get("/", protect, getTaches);
router.get("/:id", protect, getTacheById);
router.patch("/:id", protect, updateTache);
router.delete("/:id", protect, deleteTache);

export default router;
