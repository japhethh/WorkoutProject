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
  const { setToken, apiURL } = context;

  const handleRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiURL}/api/user/register`, data);
      toast.success("Registration successful");
      navigate("/login");
      setToken(localStorage.setItem("token", response.data.token));
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div className={`min-h-[700px] px-5 flex items-center justify-center bg-background`}>
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
              className="input border input-bordered w-full  text-paragraph bg-background "
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
              className="input border input-bordered w-full  text-paragraph bg-background "
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
              className="input border input-bordered w-full  text-paragraph bg-background "
              id="password"
              type="password"
              placeholder="Enter Password"
              autoComplete="current-password" // Update this line
            />

          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-buttonPrimary hover:bg-buttonPrimary/80 focus:bg-paragraph/80"
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
