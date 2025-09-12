import React, { useState } from "react";
import NewTicket from "../../components/CreateTicket.jsx";
import TicketList from "../../components/TicketList.jsx";
import { useAuth } from "../../context/AuthContext";

export const UserDashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const { logout } = useAuth();

  const handleTicketCreated = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <img
              src="/logo.png" // 🔹 replace with your logo path
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            /> */}
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              User Dashboard
            </h1>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <NewTicket onTicketCreated={handleTicketCreated} />
        <TicketList refresh={refresh} />
      </main>
    </div>
  );
};
