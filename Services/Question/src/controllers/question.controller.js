import {createQuestionService ,getQuestionsByExamService,deleteQuestionService,updateQuestionService}from "../services/question.service.js";

export const createQuestion = async (req, res) => {
  try {
    const question = await createQuestionService(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionsByExam = async (req, res) => {
  try {
    const questions = await getQuestionsByExamService(req.params.examId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteQuestion = async (req, res) => {
  try {
    const questions = await deleteQuestionService(req.params.examId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateQuestion = async (req, res) => {
  try {
    const questions = await updateQuestionService(req.params.examId, req.body);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


