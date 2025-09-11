import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../redux/slices/examSlice";

const AllExams = (props) => {
    const dispatch = useDispatch();
    const exams = useSelector((state) => state.exam.exams);
    const loading = useSelector((state) => state.exam.loading);
    const error = useSelector((state) => state.exam.error);
    useEffect(() => {
        dispatch(fetchExams());
    }, [dispatch]);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-1 flex-col p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Title</th>
                            <th className="px-6 py-3 text-left">Subject</th>
                            <th className="px-6 py-3 text-left">Total Marks</th>
                            <th className="px-6 py-3 text-left">Duration</th>
                            <th className="px-6 py-3 text-left">Exam Date</th>
                            <th className="px-6 py-3 text-left">Update</th>
                            <th className="px-6 py-3 text-left">Delete</th>
                        </tr>
                    </thead>
                    {
                        exams.map((exam) => (
                            <tbody key={exam.id} className="">
                                <tr className="hover:bg-gray-700 transition">
                                    <td className="px-6 py-3">{exam.title}</td>
                                    <td className="px-6 py-3">{exam.subject}</td>
                                    <td className="px-6 py-3">{exam.totalMarks}</td>
                                    <td className="px-6 py-3">{exam.duration}</td>
                                    <td className="px-6 py-3">{exam.examDate}</td>
                                    <td className="px-6 py-3">Update</td>
                                    <td className="px-6 py-3">Delete</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

AllExams.propTypes = {};

export default AllExams;
