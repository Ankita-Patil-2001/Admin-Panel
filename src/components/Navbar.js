import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminId");

    navigate("/");
  };

  return (
    <div>
      <nav className="xl:w-full bg-gray-800 text-white p-4 xsm:flex xl:pt-[20px] xl:p-4 xsm:pt-[0px] xsm:justify-center xl:flex xl:justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <div className="flex space-x-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 xsm:hidden xl:flex"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
