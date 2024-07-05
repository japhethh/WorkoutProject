import Home from './pages/Home'
import Nav from './components/Nav'
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';


const App = () => {
  const [expand, setExpand] = useState<boolean>(() => {
    const ex = localStorage.getItem("expandSide")
    return ex ? JSON.parse(ex) : false;
  });

  useEffect(() => {
    localStorage.setItem("expandSide", JSON.stringify(expand))
  }, [expand]);

  return (
    <div className="container mx-auto  flex">
      <Sidebar expand={expand} setExpand={setExpand} />
      <div className="h-screen flex-1">
        <Nav expand={expand} setExpand={setExpand} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App