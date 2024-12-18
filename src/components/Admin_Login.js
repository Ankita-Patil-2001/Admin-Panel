import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Constant from "../utils/Constant";
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${Constant.BASE_URL}/admin/dashLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check if we have the required data
      if (!data.token) {
        throw new Error("No authentication token received");
      }

      // Store the authentication token
      localStorage.setItem("authToken", data.token);
      
      // Store admin ID - adjust the path according to your API response structure
      // It might be data.admin._id or data.adminId or data.user._id
      if (data.admin?._id) {
        localStorage.setItem("adminId", data.admin._id);
      } else if (data.user?._id) {
        localStorage.setItem("adminId", data.user._id);
      } else if (data.adminId) {
        localStorage.setItem("adminId", data.adminId);
      } else {
        console.warn("Admin ID not found in response");
      }

      // Show success message
      toast.success("Login successful!");
      
      // Navigate to the sub-admin page
      setTimeout(() => {
        navigate("/subadmin");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 // Toggle password visibility
 const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg xl:w-96 xsm:w-[280px]">
        <h1 className="xl:text-2xl xsm:text-[23px] font-bold text-yellow-500 mb-6 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 xsm:text-[15px] xl:text-[18px]">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 xl:text-[18px] xsm:text-[14px] rounded bg-gray-700 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 xsm:text-[15px] xl:text-[18px]">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 xl:text-[18px] xsm:text-[14px] rounded bg-gray-700 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div
              className="absolute inset-y-0 right-3 top-6 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RxEyeOpen className="xl:text-md xsm:text-sm text-white" />
              ) : (
                <FaEyeSlash className="xl:text-md xsm:text-sm text-white" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full xl:py-2 xsm:py-1.5 rounded bg-green-600 text-white xl:text-[18px] xsm:text-[14px] mt-4 font-semibold hover:bg-green-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};



export default AdminLogin;