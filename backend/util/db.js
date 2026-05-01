import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/nextHourDB",
    );
    console.log(`MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

export default connectDB;
