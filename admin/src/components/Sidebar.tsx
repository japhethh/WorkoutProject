// import { createContext, useContext, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaCubes } from "react-icons/fa";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHelpOutline } from "react-icons/md";
// const SidebarContext = createContext();
interface Expands {
  expand: boolean;
  setExpand: (value: boolean) => void;
}
export const Sidebar = ({ expand }: Expands) => {
  const navigate = [
    { name: "Dashboard", href: "/", icon: <MdDashboard /> },
    { name: "Statistic", href: "/statistic", icon: <SiSimpleanalytics /> },
    { name: "Users", href: "/users", icon: <FaUser /> },
    { name: "Inventory", href: "/inventory", icon: <MdOutlineInventory2 /> },
    { name: "Orders", href: "/orders", icon: <FaCubes /> },
    { name: "Billings", href: "/billings", icon: <LiaMoneyBillSolid /> },
    { name: "Settings", href: "/settings", icon: <IoSettingsOutline /> },
    { name: "Help", href: "/help", icon: <MdOutlineHelpOutline /> },
  ];
  return (
    <div className="h-screen">
      <nav
        className={`h-full flex flex-col bg-white border-r shadow-xl  overflow-hidden transition-all duration-700
        ${expand
            ? "w-16"
            : "w-64" /* Change the width based on `expand` state */
          }`}
      >
        <div className="p-4 pb-2 flex justify-center  items-center ">
          {expand ? (
            <a className="btn btn-ghost text-xl">AD</a>
          ) : (
            <a className="btn btn-ghost text-xl">ADMIN</a>
          )}
        </div>

        <ul className="flex-1">
          {navigate.map((item) => (
            <NavLink
              to={item.href}
              className={({ isActive }) => {
                return (
                  "relative flex items-center py-2 px-3 my-1 mx-2 font-medium rounded-md cursor-pointer transition-color " +
                  (isActive
                    ? " bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600")
                );
              }}
            >
              <span className="">{item.icon}</span>
              <span
                className={`overflow-hidden transition-all ${expand ? "w-0" : "w-52 ml-3"
                  }`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </ul>

        <div className={`border-t  flex px-2`}>
          <h1 className="rounded-md py-3 px-3 bg-blue-400 font-semibold text-blue-900">
            JAP
          </h1>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expand ? "w-0" : "w-64 ml-3"
              }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-sm">John Doe</h4>
              <h4 className="text-md text-gray-500 text-sm">
                boknoy32130@gmail.com
              </h4>
            </div>
            <HiOutlineDotsVertical className="text-xl" />
          </div>
        </div>
      </nav>
    </div>
  );
};
