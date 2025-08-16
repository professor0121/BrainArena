import express from "express";
import dotenv from "dotenv";
import {sequelize,ensureDatabaseExists } from "./config/db.js";
import submissionRoutes from "./routes/submission.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/submission", submissionRoutes);
app.get('/',(req,res)=>{
    res.json("hello from submission")
})

const initDB = async () => {
  await ensureDatabaseExists(); // create DB if not exists
  await sequelize.sync({ alter: true });
  console.log("✅ DB Synced");
};

initDB().catch(err => console.error(err));
export default app;
