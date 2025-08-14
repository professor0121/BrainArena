import { Op } from "sequelize";
import Exam from "../models/exam.model.js";
import { getAllExams } from "../services/exam.service.js";

// Get all upcoming exams
export const getUpcomingExams = async (req, res) => {
  try {
    const { subject } = req.query; // optional filter

    const whereClause = {
      examDate: { [Op.gte]: new Date() }, // only future or today
    };

    if (subject) {
      whereClause.subject = subject;
    }

    const exams = await Exam.findAll({
      where: whereClause,
      order: [["examDate", "ASC"]],
    });

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching upcoming exams:", error);
    res.status(500).json({ error: "Failed to fetch upcoming exams" });
  }
};

// Get details of a single exam
export const getExamDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam details:", error);
    res.status(500).json({ error: "Failed to fetch exam details" });
  }
};


export const getExam=async(req,res)=>{
    const exam=getAllExams();
    res.status(200).json(exam)
}