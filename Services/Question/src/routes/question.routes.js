import { Router } from "express";
const router=Router();
import { createQuestion,getQuestionsByExam,deleteQuestion,updateQuestion } from "../controllers/question.controller.js";
import {adminMiddleware} from "../middlewares/admin.middleware.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";


router.post('/',adminMiddleware,createQuestion);
router.get('/:id',userMiddleware||adminMiddleware,getQuestionsByExam);
router.delete('/:id',adminMiddleware,deleteQuestion);
router.put("/:id",adminMiddleware,updateQuestion)
export default router;

