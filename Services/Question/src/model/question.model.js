import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Question = sequelize.define("Question", {
  examId: {
    type: DataTypes.INTEGER, // comes from Exam Service
    allowNull: false,
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON, // store options in array format
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true
});

export default Question;
