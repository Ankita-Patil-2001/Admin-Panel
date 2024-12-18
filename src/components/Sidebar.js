import React, { useState } from "react";
import { HiUserAdd, HiUsers } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="xl:w-64 xsm:w-[60px] relative">
      {/* Mobile Menu Bar */}
      <div className="xsm:gap-4 h-[60px] xl:hidden p-4 bg-gray-800 z-20 fixed top-0 left-0 w-full xsm:flex-col flex justify-between items-center h-16">
        <div className="flex flex-row justify-between items-center xsm:gap-14 xs:gap-[80px] xss:gap-[100px] iphone12:gap-[90px] iphone14:gap-[110px] pixel7:gap-[100px] gals8:gap-[70px] galaxyz:gap-[64px]">
          <button onClick={toggleSidebar} className="text-white xsm:text-lg">
            <FaBars/>
          </button>
          <h1 className="xl:text-xl xsm:text-sm font-bold text-white">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 text-xs px-4 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-3/4 xl:translate-x-0"
        } fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 pt-4 text-white shadow-md z-10 transition-transform duration-300`}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-center mb-2">
            Admin Panel
          </h1>
        </div>

        <ul className="xsm:pt-[0px] xl:pt-[30px]">
          {[
            { to: "/subadmin", icon: <HiUsers />, label: "Your Sub Admins" },
            { to: "/create", icon: <HiUserAdd />, label: "Create Sub Admins" },
            {
              to: "/moneytransfer",
              icon: <FaMoneyBillTransfer />,
              label: "Transfer Money",
            },                                                            
            { to: "/commission", icon: <RiMoneyRupeeCircleFill />, label: "Commission" },
          ].map((item, index) => (
            <li key={index} className="mb-4">
              <Link
                to={item.to}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
              >
                {item.icon}
                {/* Show label only if sidebar is open or on larger screens */}
                <span className={`ml-3 ${isSidebarOpen || "hidden xl:block"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Small Sidebar Strip for Mobile Icons Only */}
      {!isSidebarOpen && (
        <div className="fixed top-[80px] left-0 h-full w-[60px] bg-gray-800 p-4 text-white shadow-md z-10 xl:hidden">
          <ul className="space-y-6 pt-[0px]">
            <li>
              <Link to="/subadmin" className="flex justify-center">
                <HiUsers className="h-5 w-5" />
              </Link>
              </li>
              <li>
              <Link to="/create" className="flex justify-center">
                <HiUserAdd className="h-5 w-5" />
              </Link>
              </li>
              <li>
              <Link to="/moneytransfer" className="flex justify-center">
                <FaMoneyBillTransfer className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/commission" className="flex justify-center">
                <RiMoneyRupeeCircleFill className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 xl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
