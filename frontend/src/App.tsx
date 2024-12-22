import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Navbar from "./components/Navbar";
import Nav from "./components/Nav";
import WorkoutComponent from "./components/WorkoutComponent";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { WorkoutContext } from "./context/WorkoutContext";
import WorkoutPlans from "./pages/WorkoutPlans";
import CreateExercise from "./components/CreateExercise";


const App = () => {

  const [darkMode, setDarkMode] = useState<any>(() => {
    // Retrieve the dark mode setting from localStorage when the component mounts
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? storedDarkMode : "light"; // default to "Light" if no value is stored
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
    <div className={` ${darkMode} bg-background `}>
      <div className="">
        <ToastContainer />
        <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<WorkoutComponent />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
        </Routes>
        <Footer darkMode={darkMode} />

      </div>
    </div>
  );
};

export default App;
