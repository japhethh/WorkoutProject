import axios from 'axios'
import { useContext, useState } from 'react'
import { WorkoutContext } from '../context/WorkoutContext.tsx'
import { toast } from 'react-toastify';
interface Data {
  email: string;
  password: string;
}


const Login = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }
  const { URL } = context;
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
    } catch (error:any) {
      console.error("Error during login:", error); // Log the error for debugging
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login. Please try again."); // Show a generic error message
      }
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
              name="email" value={data.email} onChange={handleLogin}
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
            <input name="password" value={data.password} onChange={handleLogin}
              className="shadow appearance-none border text-paragraph rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-background"
              id="password"
              type="password"
              placeholder="password"
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