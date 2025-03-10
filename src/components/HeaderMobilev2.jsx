import React from "react";
import TruckIcon from "./TruckIcon";

const BookingHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full text-white bg-white border-b z-1000 border-b-gray-200">
      {/* Top Bar */}
      <div className="flex items-center justify-center px-5 py-3">
        {/* Left: Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-950">
            Welcome Removal
          </span>
          <svg
            className="w-6 h-6 text-blue-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V6M5 13l7-7 7 7" />
          </svg>
        </div>{" "}
      </div>
    </header>
  );
};

export default BookingHeader;
