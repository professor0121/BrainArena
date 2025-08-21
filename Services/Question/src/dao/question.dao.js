import Question from "../model/question.model.js";

/**
 * Create a new question
 * @param {Object} data - The question data
 * @returns {Promise<Object>} - Created question
 */
export const createQuestion = async (data) => {
  const question = new Question(data);
  return await question.save();
};

/**
 * Get all questions by exam ID
 * @param {String} examId - Exam ID to filter questions
 * @returns {Promise<Array>} - List of questions
 */
export const getQuestionsByExam = async (examId) => {
  return await Question.find({ examId });
};

/**
 * Get a single question by ID
 * @param {String} id - Question ID
 * @returns {Promise<Object|null>} - Question if found
 */
export const getQuestionById = async (id) => {
  return await Question.findById(id);
};

/**
 * Update a question by ID
 * @param {String} id - Question ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object|null>} - Updated question
 */
export const updateQuestion = async (id, updateData) => {
  return await Question.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a question by ID
 * @param {String} id - Question ID
 * @returns {Promise<Object|null>} - Deleted question
 */
export const deleteQuestion = async (id) => {
  return await Question.findByIdAndDelete(id);
};
