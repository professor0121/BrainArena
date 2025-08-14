import { Router } from "express";
import { createExam, getExams } from "../controller/exam.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createExam);
router.get("/",  getExams);

export default router;
