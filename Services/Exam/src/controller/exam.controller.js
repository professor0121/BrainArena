import * as examService from "../services/exam.service.js";
import Exam from '../models/exam.model.js'

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


export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Exam.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Failed to delete exam" });
  }
};


export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Exam.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({ error: "Exam not found" });
    }

    const updatedExam = await Exam.findByPk(id);
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Failed to update exam" });
  }
};

export const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam" });
  }
};