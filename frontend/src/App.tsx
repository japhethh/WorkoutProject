import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { WorkoutContext } from "./context/WorkoutContext";

type Props = {};

const App = (props: Props) => {
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
    <div className="container mx-auto max-md:px-0 px-7">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
