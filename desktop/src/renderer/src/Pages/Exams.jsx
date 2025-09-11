import React, { useState, useEffect } from "react";
import { createExam} from "../redux/slices/examSlice";
import { useDispatch, useSelector } from "react-redux";

const Exams = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    totalMarks: "",
    duration: "",
    examDate: "",
  });

  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const examState = useSelector((state) => state.exam);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createExam(form)).unwrap();
      alert("Exam created!");
      setForm({ title: "", subject: "", totalMarks: "", duration: "", examDate: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create exam");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Create Exam</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Exam Title"
          onChange={handleChange}
          className="border p-2 rounded bg-transparent"
          required
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          placeholder="Subject"
          onChange={handleChange}
          className="border p-2 rounded bg-transparent"
          required
        />
        <input
          type="number"
          name="totalMarks"
          value={form.totalMarks}
          placeholder="Total Marks"
          onChange={handleChange}
          className="border p-2 rounded bg-transparent"
          required
        />
        <input
          type="number"
          name="duration"
          value={form.duration}
          placeholder="Duration (minutes)"
          onChange={handleChange}
          className="border p-2 rounded bg-transparent"
          required
        />
        <input
          type="text"
          name="examDate"
          value={form.examDate}
          onChange={handleChange}
          className="border p-2 rounded bg-transparent"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default Exams;
