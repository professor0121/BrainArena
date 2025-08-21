import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import questionRoutes from "./routes/question.routes.js";
import {connectRabbitMQ} from "./services/rabbitmq.service.js";

dotenv.config();

connectRabbitMQ();

const app = express();
app.use(express.json());
connectDB();
app.use("/question", questionRoutes);


export default app;
