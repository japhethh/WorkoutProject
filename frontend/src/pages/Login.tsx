import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { WorkoutContext } from '../context/WorkoutContext.tsx';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

interface Data {
  email: string;
  password: string;
}



const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false); // State for "Remember me" checkbox
  const context = useContext(WorkoutContext);

  if (!context) {
    return null;
  }

  const { apiURL } = context;
  const [data, setData] = useState<Data>({
    email: "",
    password: ""
  });

  // Load "Remember me" checkbox state from localStorage on component mount
  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue) {
      setRememberMe(JSON.parse(rememberMeValue));
    }
  }, []);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe); // Toggle the "Remember me" state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiURL}/api/user/login`, data);

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);

        // Save "Remember me" checkbox state to localStorage if checked
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
        } else {
          localStorage.removeItem("rememberMe");
        }

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
    <div className={`min-h-screen flex items-center justify-center bg-background`}>
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
              className="input border input-bordered w-full  text-paragraph bg-background "
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
              className="input border input-bordered w-full  text-paragraph bg-background "

              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2">
              Forgot Password?
            </a>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary mr-2 cursor-pointer"
              id="rememberMe"
              required
            />
            <label htmlFor="rememberMe" className="text-sm cursor-pointer ">
              Remember me
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
              <GoogleOAuthProvider clientId="361649882289-lr0hbnh5o0ihe84cvgq1mmbeoh6022qd.apps.googleusercontent.com">
                <div className="">

                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse?.credential)
                      console.log(decoded);

                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </GoogleOAuthProvider>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
