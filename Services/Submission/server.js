import http from 'http';
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const server=http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log("the submission server is running of the port",process.env.PORT)
})