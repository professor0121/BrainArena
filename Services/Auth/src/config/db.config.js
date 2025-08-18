import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // retry for 5s
      socketTimeoutMS: 45000,        // close sockets after 45s idle
    });

    console.log("✅ MongoDB connected successfully");

    // 🔹 Listeners for connection events
    mongoose.connection.on("connected", () => {
      console.log("🔗 Mongoose reconnected");
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected. Trying to reconnect...");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err.message);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔌 Mongoose connection closed on app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB initial connection error:", error.message);
    // Retry after 5s if initial connection fails
    setTimeout(connectDB, 5000);
  }
};
