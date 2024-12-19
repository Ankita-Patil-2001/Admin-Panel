import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    // Fetch admin details from localStorage
    const name = localStorage.getItem("adminName") || "Admin"; // Default if not found
    const walletAmount = localStorage.getItem("wallet") || 0; // Default if not found
    setAdminName(name);
    setWallet(walletAmount);
  }, []);

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4 xl:flex xl:justify-between xl:items-center xsm:flex xsm:items-center xsm:justify-center xsm:gap-3 xl:p-4 xsm:pt-[60px]">
      <h2 className="xl:text-xl xsm:text-[14px] font-bold ">
          Name - <span className="text-yellow-400">{adminName}</span>
      </h2>
      <div className="flex items-center space-x-4">
        {/* Display wallet amount */}
        <span className="xl:text-xl xsm:text-[14px] text-green-400 font-semibold">
          Wallet: ₹{wallet}
        </span>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 xsm:hidden xl:flex"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
