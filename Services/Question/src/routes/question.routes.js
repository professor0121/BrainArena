import { Router } from "express";
const router=Router();
import { createQuestion,getQuestionsByExam,deleteQuestion,updateQuestion } from "../controllers/question.controller.js";

router.post('/',createQuestion);
router.get('/:id',getQuestionsByExam);
router.delete('/:id',deleteQuestion);
router.put("/id",updateQuestion)
export default router;

