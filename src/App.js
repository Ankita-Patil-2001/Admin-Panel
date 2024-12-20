import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Admin_Login from "./components/Admin_Login";
import CreateSubAdmin from "./components/Create";
import SubAdmin from "./components/SubAdmin";
import MoneyTransfer from "./components/MoneyTransfer";
import Commission from "./components/Commission";
import Transaction from "./components/Transaction";
import Reset_Pasword from "./components/Reset_Pasword";

const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  // Change this to match the key used in Admin_Login
  const isLoggedIn = !!localStorage.getItem("authToken");

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="hideenscrollmain overflow-hidden h-[100vh]">
      <Routes>
        <Route path="/" element={<Admin_Login />} />
       
        <Route
          path="*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/create" element={<CreateSubAdmin />} />
                <Route path="/subadmin" element={<SubAdmin />} />
                <Route path="/moneytransfer" element={<MoneyTransfer />} />
                <Route path="/commission" element={<Commission />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/resetpassword" element={<Reset_Pasword />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
