import express from "express";
import cors from "cors";
import { sequelize, ensureDatabaseExists } from "./config/db.js";
import adminExamRoutes from './routes/adminExam.routes.js';
import studentExamRoutes from './routes/studentExam.routes.js'
const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminExamRoutes);
app.use("/student",studentExamRoutes)

const initDB = async () => {
  await ensureDatabaseExists(); // create DB if not exists
  await sequelize.sync({ alter: true });
  console.log("✅ DB Synced");
};

initDB().catch(err => console.error(err));

export default app;
