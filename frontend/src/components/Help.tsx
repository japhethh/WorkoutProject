import { useEffect, useState } from "react";
import { MdLiveHelp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaEnvelopeOpen } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";


const Help = () => {
  const [openHelp, setOpenHelp] = useState(() => {
    const open = localStorage.getItem("openHelp");
    return open === "open" ? "open" : "close";
  }
  )

  useEffect(() => {
    localStorage.setItem("openHelp", openHelp);
  }, [openHelp]);

  const toggleHelp = () => {
    setOpenHelp((prev) => (prev === "open" ? "close" : "open"))
  }

  return (
    <div className=" bottom-4 right-4 fixed z-50 border rounded-full">
      <div className='relative '>
        {
          openHelp === "open" ? (
            <div className="bg-help h-72 w-72 absolute top-[-300px] left-[-250px] rounded-xl border-gray-500">

              {/* Announcement */}
              <div className="text-center flex justify-center items-center h-full w-full text-xl text-paragraph  ">
                <h1>On Process...</h1>
              </div>



              {/* Bottom */}
              <div className="absolute w-full rounded-b-xl h-16 bottom-0 px-5
              bg-blue-500">
                <ul className="flex justify-between items-center px-2 py-2">
                  <li className="flex flex-col items-center text-gray-800 font-medium gap-1">
                    <FaEnvelopeOpen className="text-lg" />
                    <h1 className="text-sm ">Home</h1>
                  </li>
                  <li className="flex flex-col items-center text-white">
                    <BiMessageDetail className="text-xl" />
                    <h1 className="text-sm ">Messages</h1>
                  </li>
                  <li className="flex flex-col items-center text-white">
                    <FaEnvelopeOpen className="text-lg" />
                    <h1 className="text-sm ">Home</h1>
                  </li>

                </ul>
              </div>
            </div>) : (<></>)
        }



        <div onClick={toggleHelp} className="rounded-full w-10 h-10 justify-center items-center flex bg-help">
          {openHelp === "open" ? (
            <>
              <IoIosArrowDown className="text-blue-500 text-xl" />
            </>) : (
            <>
              <MdLiveHelp className="text-blue-500 text-xl" />
            </>)}

        </div>
      </div>
    </div>
  )
}

export default Help