
interface Dark {
  darkMode: string;
  userInfo: any;
}

interface Announcement {
  head: string;
  body: string;
  footer: string;
  _id: string;
}


const Announcement = ({ darkMode, userInfo }: Dark) => {
  return (
    <div>
      {/* Drop down */}
      <div tabIndex={0} className={`absolute w-72 max-md:w-80 h-96 bg-mainbackground ${darkMode === "light" ? "border border-gray-100" : ""} bottom-[-390px] left-[-240px] max-md:left-[-200px] menu menu-sm dropdown-content  rounded-box z-[1] mt-3  p-2 shadow `}>

        <div className="py-2">
          <h1 className="text-xl text-paragraph font-semibold">Notifications</h1>
        </div>

        <ul className="flex flex-col gap-2 overflow-y-scroll h-[320px]">
          {
            userInfo && userInfo.announcement &&
            (
              userInfo.announcement.map((annc: Announcement) => (
                <li key={annc._id} className="">
                  <div className="block">
                    <div className=" flex justify-between pb-1 text-headline font-semibold text-md">
                      <h1>{annc.head}</h1> <span className="badge">New</span>
                    </div>
                    <p className="text-sm">{annc.footer}</p>
                  </div>
                </li>
              ))
            )
          }
        </ul>


      </div>
    </div>
  )
}

export default Announcement