import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MoneyTransfer() {
  const [subAdmins, setSubAdmins] = useState([]); // Always initialize as an array
  const [selectedSubAdmin, setSelectedSubAdmin] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        navigate("/");
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

      console.log("Sub-Admins Response:", response.data); // Debugging log
      // Update the state with nested subadmins array
      if (response.data.subadmins && response.data.subadmins.length > 0) {
        setSubAdmins(response.data.subadmins);
      } else {
        setSubAdmins([]); // If no sub-admins found
        toast.info("No sub-admins found");
      }
    } catch (err) {
      console.error("Error fetching sub-admins:", err);
      toast.error("Failed to fetch sub-admins");
      setSubAdmins([]);
      if (err.response?.status === 401) {
        navigate("/");
      }
    }
  };

  // Function to handle money transfer
  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Input Validation
    if (!selectedSubAdmin) {
      toast.error("Please select a Sub-Admin.");
      setIsLoading(false);
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      setIsLoading(false);
      return;
    }

    try {
      const adminId = localStorage.getItem("adminId");
      const token = localStorage.getItem("authToken");

      if (!adminId || !token) {
        toast.error("Please login first");
        navigate("/");
        return;
      }

      const response = await axios.post(
        `${Constant.BASE_URL}/admin/transfer-money`,
        {
          adminId: adminId,
          subAdminId: selectedSubAdmin,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Money transferred successfully!");
        setAmount("");
        setSelectedSubAdmin("");
        fetchSubAdmins(); // Refresh sub-admins list to show updated balances
      }
    } catch (err) {
      console.error("Error during money transfer:", err);

      // Display error messages returned by the API
      if (err.response?.status === 400) {
        toast.error(
          err.response.data.message || "Bad request: All fields are required."
        );
      } else if (err.response?.status === 404) {
        toast.error(
          err.response.data.message || "Admin or SubAdmin not found."
        );
      } else {
        toast.error("Transfer failed. Please try again.");
      }

      if (err.response?.status === 401) {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center xl:h-[91vh] xsm:h-[97.5vh] xs:h-[97.6vh] xss:h-[99vh] iphone12:h-[98.5vh] iphone14:h-[98.3vh] pixel7:h-[99vh] gals8:h-[98.5vh] galaxyz:h-[98.8vh] flex flex-col bg-gray-200 xl:p-6 xl:w-full xsm:p-6 xsm:pl-[25px] xs:pl-[35px] xss:pl-[25px] iphone12:pl-[30px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px] ">
        <div className="bg-white rounded-lg shadow-lg xl:p-8 xsm:p-6 max-w-md w-full ">
          <h2 className="xl:text-2xl xsm:text-lg font-bold text-center text-gray-800 mb-6">
            Transfer Money
          </h2>
          <form onSubmit={handleTransfer}>
            <div className="mb-4">
              <label
                className="block xl:text-lg xsm:text-sm font-medium text-gray-700 mb-2"
                htmlFor="subAdminId"
              >
                Select Sub-Admin
              </label>
              <select
                value={selectedSubAdmin}
                onChange={(e) => setSelectedSubAdmin(e.target.value)}
                className="w-full p-3 border  xl:text-lg xsm:text-xs border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                required
              >
                <option value="">Select a Sub-Admin</option>
                {subAdmins.map((subAdmin) => (
                  <option key={subAdmin._id} value={subAdmin.subAdminId}>
                    {subAdmin.name} - Balance: ₹{subAdmin.wallet || 0}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block xl:text-lg xsm:text-sm font-medium text-gray-700 mb-2"
                htmlFor="amount"
              >
                Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border  xl:text-lg xsm:text-xs border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                min="1"
                placeholder="Enter amount in ₹"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full xl:py-2 xl:px-4 xsm:py-1 xsm:px-2 xl:text-lg xsm:text-sm bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              {isLoading ? "Processing Transfer..." : "Transfer Money"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
