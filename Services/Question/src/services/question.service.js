import { createQuestion,getQuestionById,getQuestionsByExam,deleteQuestion } from "../dao/question.dao.js";

export const createQuestionService = async (data) => {
  return await createQuestion(data);
};

export const getQuestionsByExamService = async (examId) => {
  return await getQuestionsByExam(examId);
};

export const getQuestionByIdService  = async (id) => {
  return await getQuestionById(id);
};

export const updateQuestionService = async (id, data) => {
  await updateQuestion(id, data);
  return await getQuestionById(id);
};

export const deleteQuestionService = async (id) => {
  return await deleteQuestion(id);
};
