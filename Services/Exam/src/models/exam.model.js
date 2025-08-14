import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Exam = sequelize.define("Exam", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalMarks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false
  },
  examDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Exam;
