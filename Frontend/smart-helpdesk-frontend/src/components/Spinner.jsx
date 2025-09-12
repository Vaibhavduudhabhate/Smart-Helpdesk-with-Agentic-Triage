import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, { state: { from: location.pathname } });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      <div className="text-center w-full max-w-md">
        {/* Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Redirecting you in{" "}
          <span className="text-blue-600">{count}</span> second
          {count !== 1 && "s"}...
        </h1>

        {/* Spinner animation */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2 transition-all duration-1000 ease-linear"
            style={{ width: `${(count / 5) * 100}%` }}
          ></div>
        </div>

        {/* Subtext */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          You will be taken back to the{" "}
          <span className="font-medium text-blue-600 capitalize">{path}</span>{" "}
          page.
        </p>
      </div>
    </div>
  );
};

export default Spinner;
