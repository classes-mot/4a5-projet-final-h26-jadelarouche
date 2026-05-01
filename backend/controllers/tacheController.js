import Tache from "../models/tache";

// Ajouter une tâche protégé
export const addTache = async (req, res) => {
  try {
    const tache = await Tache.create({
      ...req.body,
      user: req.user.id, // Associe la tache a l'utilisateur
    });
    res.status(201).json(tache);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister les tâches de l'utilisateur connecté
export const getTaches = async (req, res) => {
  try {
    const taches = await Tache.find({ user: req.user.id }).sort({
      date: 1,
      heureDebut: 1,
    }); // Tri par date puis heure
    res.json(taches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une tâche par ID (protégé)
export const getTacheById = async (req, res) => {
  try {
    const tache = await Tache.findOne({
      _id: req.params.id,
      user: req.user.id, //On vérifie que la tache appartient à l'utilisateur
    });

    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.json(tache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier une tâche (protégé)
export const updateTache = async (req, res) => {
  try {
    const tache = await Tache.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Sécurité importante
      req.body,
      { new: true, runValidators: true },
    );

    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.json(tache);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une tâche (protégé)
export const deleteTache = async (req, res) => {
  try {
    const tache = await Tache.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
