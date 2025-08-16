import Submission from "../models/submission.model.js";
import axios from "axios";

export const createSubmission = async (data) => {
  const { examId, studentId, answers } = data;

  let score = 0;

  // Validate answers with Question Service
  for (const ans of answers) {
    const response = await axios.get(
      `http://localhost:5001/api/questions/${ans.questionId}` // Question Service
    );

    const question = response.data;

    if (question.correctAnswer === ans.selected) {
      score += question.marks;
    }
  }

  // Save Submission
  const submission = await Submission.create({
    examId,
    studentId,
    answers,
    score,
  });

  return submission;
};

export const getSubmissionById = async (id) => {
  return await Submission.findByPk(id);
};
