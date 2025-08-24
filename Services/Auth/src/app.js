import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectDB from "./config/db.config.js";
import { connectRabbitMQ } from "./services/rabbitmq.service.js";
import {startAuthConsumer} from "./consumers/verifyAdmin.js";
import {startAuthUserConsumer} from "./consumers/verifyUser.js";

const app = express();
connectDB();
connectRabbitMQ();
startAuthConsumer();
startAuthUserConsumer();

app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(express.json());

// Routes
app.use("/v1", authRoutes);
app.use("/v1/admin",adminRoutes)


export default app;
