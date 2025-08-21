import Exam from "../models/exam.model.js";

export const getExamById = async (examId) => {
    return await Exam.findById(examId);
};

