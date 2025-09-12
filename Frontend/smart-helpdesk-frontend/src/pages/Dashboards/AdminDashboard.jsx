import React from 'react'
import ArticleTable from '../../components/ArticalTable'
import TicketList from '../../components/TicketList'
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className='bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'>
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              Admin Dashboard
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
        <ArticleTable onLogout={logout} />
        <TicketList  />
      </div>
    </>
  )
}
