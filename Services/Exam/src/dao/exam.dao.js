import Exam from "../models/exam.model.js";

export const getExamByIdDao = async (examId) => {
    return await Exam.findById(examId);
};

export const createExamDao = async (examData) => {
    const exam = new Exam(examData);
    return await exam.save();
};

export const updateExamDao = async (examId, examData) => {
    return await Exam.findByIdAndUpdate(examId, examData, { new: true });
};

export const deleteExamDao = async (examId) => {
    return await Exam.findByIdAndDelete(examId);
};


export const getAllExamsDao = async () => {
    return await Exam.find();
};

export const getAllExams = async () => {
    return await Exam.find();
};