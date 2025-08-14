import * as questionService from "../services/questionService.js";

export const createQuestion = async (req, res) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionsByExam = async (req, res) => {
  try {
    const questions = await questionService.getQuestionsByExam(req.params.examId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteQuestion = async (req, res) => {
  try {
    const questions = await questionService.deleteQuestion(req.params.examId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateQuestion = async (req, res) => {
  try {
    const questions = await questionService.deleteQuestion(req.params.examId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


