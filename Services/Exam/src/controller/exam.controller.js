import * as examService from "../services/exam.service.js";

export const createExam = async (req, res) => {
  try {
    const exam = await examService.createExam(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await examService.getAllExams();
    res.json({ success: true, data: exams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
