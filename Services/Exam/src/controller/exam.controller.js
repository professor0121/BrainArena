import {createExamService, getAllExamsService,deleteExamService,updateExamService,getExamByIdService} from "../services/exam.service.js";

export const createExam = async (req, res) => {
  try {
    const exam = await createExamService(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await getAllExamsService();
    res.json({ success: true, data: exams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExamService(id);
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Failed to delete exam" });
  }
};


export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const {data} = req.body;
    const updatedExam = await updateExamService(id, data);
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Failed to update exam" });
  }
};

export const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await getExamByIdService(id);
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam" });
  }
};