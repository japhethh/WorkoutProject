import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { WorkoutContext } from '../context/WorkoutContext';
import { toast } from 'react-toastify';

interface Data {
  userName: string;
  email: string;
  password: string;
}

const Register = () => {
  const [data, setData] = useState<Data>({
    userName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }
  const { setToken, URL } = context;

  const handleRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/user/register`, data);
      toast.success("Registration successful");
      navigate("/login");
      setToken(localStorage.setItem("token", response.data.token));
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div className=" min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-background shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-paragraph text-sm font-bold mb-2" htmlFor="userName">
              Username
            </label>
            <input
              name="userName"
              value={data.userName}
              onChange={handleRegister}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-paragraph bg-background leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              type="text"
              placeholder="Enter Username"
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-paragraph text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={data.email}
              onChange={handleRegister}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-paragraph bg-background leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter Email"
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-paragraph text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              value={data.password}
              onChange={handleRegister}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-paragraph bg-background mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              autoComplete="current-password" // Update this line
            />

          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
