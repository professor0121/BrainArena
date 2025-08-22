
import { getAllExamsService,getExamByIdService } from "../services/exam.service.js";

// Get all upcoming exams
export const getUpcomingExams = async (req, res) => {
  try {
    const currentDate = new Date();
    const exams = await getAllExamsService();

    const upcomingExams = exams.filter(exam => new Date(exam.examDate) >= currentDate);

    res.status(200).json(upcomingExams);
  } catch (error) {
    console.error("Error fetching upcoming exams:", error);
    res.status(500).json({ error: "Failed to fetch upcoming exams" });
  }
};

// Get details of a single exam
export const getExamDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await getExamByIdService(id);

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
    const exam=getAllExamsService();
    res.status(200).json(exam)
}