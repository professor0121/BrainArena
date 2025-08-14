import Question from "../model/question.model.js";

export const createQuestion = async (data) => {
  return await Question.create(data);
};

export const getQuestionsByExam = async (examId) => {
  return await Question.findAll({ where: { examId } });
};

export const getQuestionById = async (id) => {
  return await Question.findByPk(id);
};

export const updateQuestion = async (id, data) => {
  await Question.update(data, { where: { id } });
  return await Question.findByPk(id);
};

export const deleteQuestion = async (id) => {
  return await Question.destroy({ where: { id } });
};
