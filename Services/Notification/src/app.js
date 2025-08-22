import express from 'express';
const app=express();
import notificationRoutes from './routes/notification.routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/notification",notificationRoutes);

export default app;