import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { WorkoutContext } from "./context/WorkoutContext";

type Props = {};

const App = (props: Props) => {
  const context = useContext(WorkoutContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context) {
      return;
    }

    const { token } = context;

    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [context, navigate]);

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
      </Routes>
    </div>
  );
};

export default App;
