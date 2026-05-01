import mongoose from "mongoose";

const tacheSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // Fromat "YYYY-MM-DD"
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true },
  },
  { timestamps: true },
);

// Création du modèle
const Tache = mongoose.model("Tache", tacheSchema);

export default Tache;
