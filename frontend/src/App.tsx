import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Navbar from "./components/Navbar";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { WorkoutContext } from "./context/WorkoutContext";


const App = () => {

  const [darkMode, setDarkMode] = useState<any>(() => {
    // Retrieve the dark mode setting from localStorage when the component mounts
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? storedDarkMode : "light"; // default to "dark" if no value is stored
  });

  useEffect(() => {
    // Store the dark mode setting in localStorage whenever it changes
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const context = useContext(WorkoutContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!context) {
      return;
    }

    const { token } = context;

    if (token) {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/")
      }
    } else {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");

      }
    }
  }, [context, navigate, location]);

  if (!context) {
    return null;
  }

  return (
    <div className={` ${darkMode} bg-background`}>
      <div className="container mx-auto max-md:px-0 py-2 px-7">
      <ToastContainer />
      <Nav darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer darkMode={darkMode}/>
      </div>
    </div>
  );
};

export default App;
