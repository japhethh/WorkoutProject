import Home from './pages/Home'
import AddAnnouncement from './pages/AddAnnouncement'
import Nav from './components/Nav'
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
// import SidebarMobile from './components/SidebarMobile';
import Users from './components/Users';
import ListAnnouncement from './components/ListAnnouncement';
// import ListAnnounce from './components/ListAnnounce';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [expand, setExpand] = useState<boolean>(() => {
    const ex = localStorage.getItem("expandSide")
    return ex ? JSON.parse(ex) : false;
  });

  useEffect(() => {
    localStorage.setItem("expandSide", JSON.stringify(expand))
  }, [expand]);

  return (
    <div className=" flex">
      <ToastContainer />

      <Sidebar expand={expand} setExpand={setExpand} />
      {/* <SidebarMobile /> */}
      <div className="h-screen flex-1">
        <Nav expand={expand} setExpand={setExpand} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-announcement" element={<AddAnnouncement />} />
          <Route path="/listannouncement" element={<ListAnnouncement />} />
          {/* <Route path="/listannouncement" element={<ListAnnounce />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App