import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    totalMarks: {
      type: Number,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    examDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true 
  }
);

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
