import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
