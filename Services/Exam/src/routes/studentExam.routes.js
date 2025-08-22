import { Router } from "express";
import { getUpcomingExams,getExam } from "../controller/studentExam.controller.js";


const router = Router();

router.get("/", getUpcomingExams);    // GET /student  → list all upcoming exams
// router.get("/:id", getExamDetails);   // GET /student/:id → single exam details
router.get("/:id",getExam)

export default router;
