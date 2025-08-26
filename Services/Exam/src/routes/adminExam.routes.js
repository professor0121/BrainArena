import { Router } from "express";
import { createExam, getExams ,deleteExam,updateExam,getExam} from "../controller/exam.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/exam", createExam);       // POST /admin
router.get("/exam", getExams);          // GET /admin
router.get("/exam/:id", getExam);        // GET /admin/:id
router.put("/exam/:id", updateExam);     // PUT /admin/:id
router.delete("exam/:id", deleteExam);  // DELETE /admin/:id

export default router;
