import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectDB from "./config/db.config.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/v1", authRoutes);
app.use("/v1/admin",adminRoutes)


export default app;
