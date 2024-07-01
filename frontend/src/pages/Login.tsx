import { useContext, useState } from "react";
import axios from 'axios';
import { WorkoutContext } from '../context/WorkoutContext.tsx';
import { toast } from 'react-toastify';

interface Data {
  email: string;
  password: string;
}

interface Loading {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(WorkoutContext);

  if (!context) {
    return null;
  }

  const { URL } = context;
  const [data, setData] = useState<Data>({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/api/user/login`, data);

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error during login:", error); // Log the error for debugging
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={` min-h-screen flex items-center justify-center  bg-background`}>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-background shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-paragraph text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              name="email"
              value={data.email}
              onChange={handleLogin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-paragraph leading-tight focus:outline-none focus:shadow-outline bg-background"
              id="username"
              type="text"
              placeholder="Email"
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
              onChange={handleLogin}
              className="shadow appearance-none border text-paragraph rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-background"
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
          <div className="mb-6">
            <label className="block text-paragraph font-bold">
              <input className="mr-2 leading-tight bg-background" type="checkbox" required />
              <span className="text-sm">Remember Me</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm text-primary"></span>
              ) : (
                <>
                  Sign In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
