import React from "react";
import welcomeIcon from "../assets/welcome-icon.png"; // adjust the path as needed

const BookingHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-b-gray-100 ">
      {/* Top Bar */}
      <div className="flex items-center justify-around py-3 pl-5 ">
        {/* Brand */}
        <div className="flex items-center">
          <img src={welcomeIcon} alt="Welcome Icon" className="w-10 h-10" />
        </div>
        <div className="px-6 py-3 mx-3 font-semibold text-white bg-indigo-600 rounded-xl">
          Contact 07943 059792
        </div>
      </div>
    </header>
  );
};

export default BookingHeader;
