import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Submission = sequelize.define("Submission", {
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,  // Comes from Auth/User Service
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSON,  // [{questionId: 1, selected: "Paris"}]
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true
});

export default Submission;
