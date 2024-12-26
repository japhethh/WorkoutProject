import { WorkoutContext } from "../context/WorkoutContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DefaultLogo from '../assets/defaultLogo.png';
import { RxHamburgerMenu } from "react-icons/rx";

interface Dark {
  setDarkMode: (value: string) => void;
  darkMode: string;
}

const Nav = ({ setDarkMode, darkMode }: Dark) => {
  const [isChecked, setIsChecked] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode === "light";
  });

  const [modalData, setModalData] = useState({
    body: "",
    footer: ""
  });

  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }
  const { token, userInfo, formatTimeInPhilippines, clockTime } = context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("profileData");
    window.location.href = "/login";
    // window.location.reload();
  };

  const handleDarkModeToggle = () => {
    const newMode = isChecked ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    setIsChecked(!isChecked);
  };

  const announceModel = (footer: string, body: string) => {
    setModalData({
      body: body,
      footer: footer
    });

    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className={`navbar bg-background  flex justify-between items-center oswald_jap md:w-4/6 w-6/6 mx-auto max-md:px-0 py-5 `}>


      {token ? (
        <>
          <div className=" ">
            {userInfo.user && (
              <Link to="/" className={`btn btn-ghost text-xl text-paragraph`}>
                {userInfo.user.userName}
              </Link>
            )}

          </div>

          <div className=" max-lg:hidden ml-10 text-paragraph text-lg font-semibold uppercase gap-5">

            <Link to="/">
              <h1 className="">Home</h1>
            </Link>
            <Link to="/exercise-list">
              <h1 className="">Exercises List</h1>
            </Link>
            <Link to="/workout-plans">
              <h1 className="">Workout plan</h1>
            </Link>
            <Link to="/custom">
              <h1 className="">Custom</h1>
            </Link>
            <Link to="/profile">
              <h1 className="">My profile</h1>
            </Link>
          </div>

          <div className={`max-md:drawer md:hidden z-50 `}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

              <ul className={`menu bg-base-200 text-2xl  min-h-full w-80 p-4 text-paragraph  ${darkMode === "light" ? "bg-black " : "bg-white "
                }`}>
                <li className="menu-title">
                  <h2 className="text-3xl font-bold uppercase text-center mb-4 text-paragraph">Site Menu</h2>
                </li>
                {/* Sidebar content here */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/workout-plans">Workout Plan</Link></li>
                <li><Link to="/custom">Custom</Link></li>
                <li><a>My Profile</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>

          <div className="">

            <div className="text-paragraph font-semibold max-md:hidden">
              {formatTimeInPhilippines(clockTime)}
            </div>

            {/* Notification */}
            <div className="dropdown dropdown-end z-30">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle text-paragraph"
              >
                <div className="indicator ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </div>

              {/* Announcement Dropdown */}
              <div
                tabIndex={0}
                className={`absolute w-72 max-md:w-80 h-96 bg-mainbackground ${darkMode === "light" ? "border border-gray-100" : ""
                  } bottom-[-390px] left-[-240px] max-md:left-[-200px] menu menu-sm dropdown-content  rounded-box z-[1] mt-3  p-2 shadow `}
              >
                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box w-11/12 h-96 max-w-5xl bg-background flex flex-col">
                    <h3 className="font-bold text-lg text-headline text-center py-0">Announcement</h3>
                    <div className="flex-1 overflow-y-auto border-t-[2px] border-b-[2px] border-gray-200 text-paragraph ">
                      <p className="text-md break-words px-4 py-2 text-paragraph" dangerouslySetInnerHTML={{ __html: modalData.body }}></p>
                    </div>
                    <div className="modal-action flex justify-end py-0">
                      <form method="dialog">
                        <button className="btn">Close</button>
                      </form>

                    </div>
                  </div>
                </dialog>



                <div className="py-2">
                  <h1 className="text-xl text-paragraph font-semibold text-center">
                    Notifications
                  </h1>
                </div>

                <ul className="flex flex-col gap-2 overflow-y-scroll h-[320px]">
                  {userInfo &&
                    userInfo.announcement &&
                    userInfo.announcement.map((annc) => (
                      <li
                        key={annc._id}
                        className=""
                        onClick={() => announceModel(annc.footer, annc.body)}
                      >
                        <div className="block py-4 bg-background border border-paragraph">
                          <div className="flex justify-between pb-1 text-wrap text-headline font-medium text-md ">
                            {/* <div className="flex justify-center items-center px-2">
                            <MdOutlineTipsAndUpdates className="text-xl text-green-500" />
                            </div> */}
                            <h1>{annc.head}</h1>
                            <span className="badge">New</span>
                          </div>
                          {/* <p className="text-sm">{annc.footer}</p> */}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

            </div>

            {/* DarkMode Toggle */}
            <label className="switch-container">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleDarkModeToggle}
              />
              <span className="slider"></span>
            </label>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end max-md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile Avatar"
                    src={
                      userInfo.user && userInfo.user.image
                        ? userInfo.user.image
                        : DefaultLogo
                    }
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>Logout</button>
                  {/* <Link to="/login" onClick={handleLogout} > Logout</Link> */}
                </li>
              </ul>
            </div>
            <div className="max-md:flex-1  md:hidden  mx-4 border py-1 px-1">
              <label htmlFor="my-drawer" className="text-semibold">
                <RxHamburgerMenu className="text-paragraph  text-2xl " />

              </label>
            </div>
          </div>
        </>
      ) : (
        // Render this if user is not logged in
        <>
          <div className="flex-1">
            <h1 className="text-headline font-semibold text-xl">
              Workout Plan
            </h1>
          </div>
          <div className="flex-none gap-3">
            <label className="switch-container">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleDarkModeToggle}
              />
              <span className="slider"></span>
            </label>
            <Link
              className="btn text-white border-none bg-[#3B82F6]"
              to={location.pathname === "/login" ? "/register" : "/login"}
            >
              {location.pathname === "/login" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </>
      )}


    </div>
  );
};

export default Nav;
