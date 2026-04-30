import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextHourDB";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch(() => {
    console.log("Connexion à MongoDB échoué !");
  });
