import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <main className="flex-1 container mx-auto pt-6 pb-8 px-4 md:px-6">
          {children}
        </main>
      )}

      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;

