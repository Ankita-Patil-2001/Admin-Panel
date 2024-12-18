import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";
import axios from "axios";

function CreateSubAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateSubAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      // Make the API call using Axios
      const response = await axios.post(
        `${Constant.BASE_URL}/sub-admin/create`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );

      // Handle success
      toast.success("SubAdmin created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Check if the error is from the response
      if (error.response) {
        const { status, data } = error.response;

        // Authentication failure
        if (status === 401 || data.message === "Please authenticate as Admin") {
          toast.error("Authentication failed. Please check your permissions.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          // Other errors
          toast.error(data.message || "Failed to create sub-admin", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        // Generic error handling
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="xl:h-[91vh] xsm:h-[97.5vh] xs:h-[97.6vh] xss:h-[99vh] iphone12:h-[98.5vh] iphone14:h-[98.3vh] pixel7:h-[99vh] gals8:h-[98.5vh] galaxyz:h-[98.8vh] flex flex-col bg-gray-200 xl:p-6 xl:w-full xsm:p-6 xsm:pl-[25px] xs:pl-[35px] xss:pl-[25px] iphone12:pl-[30px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px] ">
        <div className="flex flex-grow items-center justify-center">
        <div className="bg-white xl:p-8 xsm:p-4 rounded-lg shadow-xl w-96">
        <h1 className="xl:text-2xl xsm:lg font-semibold text-yellow-500 mb-6 text-center">
        Create SubAdmin
            </h1>
            
            <form onSubmit={handleCreateSubAdmin} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <RxEyeOpen className="xl:text-xl xsm:text-xs text-black" />
                  ) : (
                    <FaEyeSlash className="xl:text-xl xsm:text-xs text-black" />
                  )}
                </div>
              </div>
              {/* <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="block w-full p-2 bg-white text-black border rounded-md focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <RxEyeOpen className="text-black" />
                  ) : (
                    <FaEyeSlash className="text-black" />
                  )}
                </div>
              </div> */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white xl:p-2 xsm:p-1 xl:text-lg xsm:text-sm rounded-md hover:bg-green-700 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating SubAdmin..." : "Create SubAdmin"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreateSubAdmin;
