import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // Vérifier si le token est présent dans l'en-tête Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Non autorisé, token manquant",
    });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    // Attacher l'utilisateur décodé à la requête
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur token :", error.message);
    res.status(401).json({
      message: "Token invalide ou expiré",
    });
  }
};
