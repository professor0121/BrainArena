import Exam from "../models/exam.model.js";

export const createExamService = async (examData) => {
  return await Exam.create(examData);
};

export const getAllExams = async () => {
  return await Exam.findAll();
};

export const getExamById = async (id) => {
  return await Exam.findByPk(id);
};

export const updateExam = async (id, data) => {
  return await Exam.update(data, { where: { id } });
};

export const deleteExam = async (id) => {
  return await Exam.destroy({ where: { id } });
};
