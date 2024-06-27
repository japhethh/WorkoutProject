import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {}

const App = (props: Props) => {
  return (
    <div className="container mx-auto max-md:px-0 px-7">
      <ToastContainer/>
      <Login/>  
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App