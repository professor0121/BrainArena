import { createSubmission, getSubmissionById } from "../services/submission.service.js";

export const submitExam = async (req, res) => {
  try {
    const submission = await createSubmission(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubmission = async (req, res) => {
  try {
    const submission = await getSubmissionById(req.params.id);
    if (!submission) return res.status(404).json({ message: "Not found" });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
