import express from "express";
import { submitExam, getSubmission } from "../controllers/submission.controller.js";

const router = express.Router();

router.post("/", submitExam);
router.get("/:id", getSubmission);

export default router;