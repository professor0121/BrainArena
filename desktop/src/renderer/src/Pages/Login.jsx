import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slices/authSlice";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ formdata: form }));
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-transparent p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-400 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              required
              className="mt-1 w-full rounded-md border bg-transparent border-gray-300 px-3 py-2 text-sm shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              required
              className="mt-1 w-full rounded-md border bg-transparent border-gray-300 px-3 py-2 text-sm shadow-sm "
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 py-2 text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
