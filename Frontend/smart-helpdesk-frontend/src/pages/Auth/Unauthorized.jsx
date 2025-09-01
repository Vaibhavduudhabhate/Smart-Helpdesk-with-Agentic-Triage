import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Unauthorized</h1>
      <p className="mb-6 text-gray-700">You don’t have permission to view this page.</p>
      <button 
        onClick={handleLoginRedirect} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  );
};
