import User from "../models/user.js";

// Inscription d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet email existe déjà" });
    }

    const user = await User.create({
      nom,
      email,
      motDePasse,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Connexion
export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    if (user.motDePasse !== motDePasse) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    res.json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir le profil de l'utilisateur connecté
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-motDePasse");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
