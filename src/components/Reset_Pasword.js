import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Constant from "../utils/Constant";
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Reset_Pasword() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [subAdminId, setSubAdminId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // Fetch sub-admins on component mount
  useEffect(() => {
    fetchSubAdmins();
  }, []);

  // Function to fetch sub-admins
  const fetchSubAdmins = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      const token = localStorage.getItem("authToken");

      if (!adminId || !token) {
        toast.error("Please login first");
        return;
      }

      const response = await axios.get(
        `${Constant.BASE_URL}/admin/subadmins/${adminId}`,
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );

      if (response.data.subadmins && response.data.subadmins.length > 0) {
        setSubAdmins(response.data.subadmins);
      } else {
        setSubAdmins([]);
        toast.info("No sub-admins found");
      }
    } catch (err) {
      console.error("Error fetching sub-admins:", err);
      toast.error("Failed to fetch sub-admins");
    }
  };

  const handleResetPassword = async () => {
    if (!subAdminId || !newPassword) {
      toast.error("SubAdmin ID and New Password are required");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${Constant.BASE_URL}/admin/subadmin/reset-password/${subAdminId}`,
        { newPassword },
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Password reset successful");
        setSubAdminId(""); // Clear input fields
        setNewPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="xl:text-2xl xsm:text-md font-bold mb-4">
          Reset Sub-Admin Password
        </h1>
        <div className="xl:w-1/2 bg-gray-100 p-4 rounded shadow-lg">
          <div className="mb-4">
            <label
              htmlFor="subAdminId"
              className="block xl:text-sm xsm:text-[14px] font-medium text-gray-700"
            >
              Select Sub-Admin:
            </label>
            <select
              value={subAdminId}
              onChange={(e) => setSubAdminId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full xl:text-sm xsm:text-[12px]"
            >
              <option value="" className="xl:text-sm xsm:text-[14px]">
                Select a Sub-Admin
              </option>
              {subAdmins.map((subAdmin) => (
                <option key={subAdmin._id} value={subAdmin.subAdminId}>
                  {subAdmin.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block xl:text-sm xsm:text-[14px] font-medium text-gray-700"
            >
              New Password:
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full xl:text-sm xsm:text-[12px]"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center xl:pr-[350px]  xsm:pr-[60px] xsm:pb-[17px]  xl:pb-[140px]  cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RxEyeOpen className="xl:text-md xsm:text-xs text-black" />
              ) : (
                <FaEyeSlash className="xl:text-md xsm:text-xs text-black" />
              )}
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-blue-500 text-white px-4 py-2 xl:text-sm xsm:text-[12px] rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Reset_Pasword;
