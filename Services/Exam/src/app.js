import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminExamRoutes from './routes/adminExam.routes.js';
import studentExamRoutes from './routes/studentExam.routes.js'
import {connectRabbitMQ} from "./services/rabbitmq.service.js"



const app = express();

app.use(cors());
app.use(express.json());
connectDB();
connectRabbitMQ();


app.use("/admin", adminExamRoutes);
app.use("/student",studentExamRoutes)



export default app;
