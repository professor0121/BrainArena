import express from "express";
import cors from "cors";
import { sequelize, ensureDatabaseExists } from "./config/db.js";
import examRoutes from "./routes/examRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/exams", examRoutes);

const initDB = async () => {
  await ensureDatabaseExists(); // create DB if not exists
  await sequelize.sync({ alter: true });
  console.log("✅ DB Synced");
};

initDB().catch(err => console.error(err));

export default app;
