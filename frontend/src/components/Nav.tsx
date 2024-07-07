import { WorkoutContext } from "../context/WorkoutContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DefaultLogo from '../assets/defaultLogo.png'
import Announcement from './Announcement'
interface Dark {
  setDarkMode: (value: string) => void;
  darkMode: string;
}


const Nav = ({ setDarkMode, darkMode }: Dark) => {


  const [isChecked, setIsChecked] = useState(() => {

    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode === "light";
  });
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }
  const { token, userInfo } = context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("profileData");
    window.location.href = "/login"
  };


  const handleDarkModeToggle = () => {
    // Toggle between "dark" and "light" and update localStorage
    const newMode = isChecked ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    setIsChecked(!isChecked);
  };

  return (
    <div className={`navbar bg-background  `}>
      {token ? (
        <>
          <div className="flex-1">

            {userInfo.user && (<Link to="/" className={`btn btn-ghost text-xl text-paragraph`}>{userInfo.user.userName}</Link>)}
          </div>
          <div className="flex-none">

            {/* Notification */}
            <div className="dropdown dropdown-end z-30">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-paragraph">
                <div className="indicator ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </div>

              {/* Announncement */}
              <Announcement darkMode={darkMode} userInfo={userInfo} />
              {/* End */}

            </div>

            {/* DarkMode */}
            <label className="switch-container">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleDarkModeToggle}
              />
              <span className="slider"></span>
            </label>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={userInfo.user && userInfo.user.image ? userInfo.user.image : DefaultLogo}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <h1 className="text-headline font-semibold text-xl">Workout Plan</h1>
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
            {/* <Link to="/register" className="btn text-white border-none bg-[#3B82F6]">
              Sign Up
            </Link> */}

            <Link className="btn text-white border-none bg-[#3B82F6]" to={location.pathname === "/login" ? "/register" : "/login"}>
              {location.pathname === "/login" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </>
      )}

    </div>
  )
}

export default Nav