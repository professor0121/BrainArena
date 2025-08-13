import express from "express";
import cors from "cors";
import sequelize from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/v1", authRoutes);

// Test DB Connection & Sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync();
    console.log("Models synced...");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

export default app;
