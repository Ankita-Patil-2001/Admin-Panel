import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Constant from "../utils/Constant";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubAdmin() {
  const [subAdmins, setSubAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
  
        if (
          response.data?.subadmins &&
          Array.isArray(response.data.subadmins)
        ) {
          setSubAdmins(response.data.subadmins);
        } else {
          setSubAdmins([]);
          toast.error("Invalid data received from the server.");
        }
      } catch (err) {
        console.error("Error fetching subadmins:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch sub-admins"
        );
        if (err.response?.status === 401) {
          navigate("/");
        }
      }
    };
  
    fetchSubAdmins();
  }, [navigate]); // फक्त `navigate` dependency ठेवली.
  
  const handleResetLogin = async (subAdminId) => {
    try {
      const token = localStorage.getItem("authToken");
  
      const response = await axios.post(
        `${Constant.BASE_URL}/admin/subadmin/reset-login/${subAdminId}`,
        {},
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        toast.success("Login status reset successfully");
  
        // Update the state dynamically
        setSubAdmins((prevSubAdmins) =>
          prevSubAdmins.map((subAdmin) =>
            subAdmin.subAdminId === subAdminId
              ? { ...subAdmin, isLoggedIn: false }
              : subAdmin
          )
        );
      } else {
        toast.error(response.data.message || "Failed to reset login status");
      }
    } catch (err) {
      console.error("Error resetting login:", err);
      toast.error(
        err.response?.data?.message || "Failed to reset login status"
      );
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="xl:p-6 xsm:pt-[55px] xsm:p-3 xsm:pl-[25px] xs:pl-[20px] bg-gray-200 min-h-screen xl:w-full overflow-auto xsm:w-[270px]">
        <h1 className="xl:text-3xl xsm:text-lg font-bold text-gray-800 mb-4">
          Sub-Admins
        </h1>
        {subAdmins.length > 0 ? (
          <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="xl:min-w-full divide-y divide-gray-200 xsm:w-[350px]">
                <thead className="bg-gray-50">
                  <tr className="xsm:py-1">
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Created On
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Creator Admin ID
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      LoggedIn
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subAdmins.map((subAdmin) => (
                    <tr key={subAdmin._id} className="text-center">
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                        {subAdmin.name}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                        {subAdmin.email}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                        {new Date(subAdmin.createdAt).toLocaleDateString()}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                        {subAdmin.createdBy}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                        {subAdmin.isLoggedIn ? "Yes" : "No"}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleResetLogin(subAdmin.subAdminId)}
                        >
                          Reset Login
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No Sub-Admins found.</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
