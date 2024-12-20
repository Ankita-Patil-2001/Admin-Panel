import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (adminId) {
      fetchTransactions();
    }
  }, [adminId]);

  const fetchTransactions = async () => {
    if (!adminId) {
      console.error("Admin ID is missing!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${Constant.BASE_URL}/admin/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching transactions:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="xl:p-6 xsm:pt-[5px] xsm:p-3 xsm:pl-[25px] xs:pl-[20px] bg-gray-200 min-h-screen xl:w-full overflow-auto  xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
      <h1 className="xl:text-3xl xsm:text-lg font-bold text-gray-800 mb-4 ">Transactions</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : transactions.length > 0 ? ( // <-- Fix the condition here
          <div className="overflow-x-auto">
          <table className="xl:min-w-full divide-y divide-gray-200 xsm:w-[350px]">
          <thead className="bg-gray-50">
                <tr>
                <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Sub Admin ID
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Type
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Admin Balance Before
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Admin Balance After
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-2 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                  {transaction._id}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {transaction.subAdminId}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {transaction.transactionType}
                    </td>
                    <td
                      className={`xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900 ${
                        transaction.status === "SUCCESS"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {transaction.adminBalanceBefore}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {transaction.adminBalanceAfter}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">No transactions found.</div>
        )}
      </div>
    </>
  );
}

export default Transaction;
