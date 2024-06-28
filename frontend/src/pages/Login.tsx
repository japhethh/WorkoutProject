import axios from 'axios'
import React, { useContext, useState } from 'react'
import { WorkoutContext } from '../context/WorkoutContext.tsx'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
type Props = {}
interface Data {
  email: string;
  password: string;
}
const Login = (props: Props) => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }
  const { URL, setToken } = context;
  const [data, setData] = useState<Data>({
    email: "",
    password: ""
  })

  // const navigate = useNavigate();

  const handleLogin = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }))
    console.log(data)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/user/login`, data);
  
      if (!response.data.token) {
        toast.error("Error");
      } else {
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error during login:", error); // Log the error for debugging
      toast.error("An error occurred during login. Please try again."); // Show a generic error message
    }
  };
  
  
  return (
    <div className="dark min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              name="email" value={data.email} onChange={handleLogin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input name="password" value={data.password} onChange={handleLogin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox" required />
              <span className="text-sm">Remember Me</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit"
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login