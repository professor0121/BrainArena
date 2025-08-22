import { createExamDao ,getAllExamsDao,getExamByIdDao,updateExamDao,deleteExamDao} from "../dao/exam.dao.js";

export const createExamService = async (examData) => {
  return await createExamDao(examData);
};

export const getAllExamsService = async () => {
  return await getAllExamsDao();
};

export const getExamByIdService = async (id) => {
  return await getExamByIdDao(id);
};

export const updateExamService = async (id, data) => {
  return await updateExamDao(id, data);
};

export const deleteExamService = async (id) => {
  return await deleteExamDao(id);
};
