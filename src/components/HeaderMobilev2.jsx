import React from "react";
import IconWhatsAppMobile from "./IconWhatsAppMobile";
import IconTextMobile from "./IconTextMobile";

const BookingHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-b-gray-200">
      {/* Top Bar */}
      <div className="flex items-center justify-around w-11/12 py-3 mx-auto">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-950">
            Welcome Removal
          </span>
          {/* <svg
            className="w-6 h-6 text-blue-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V6M5 13l7-7 7 7" />
          </svg> */}
        </div>
        <div className="px-6 py-3 font-semibold bg-indigo-600 text-gray-50 rounded-xl">
          Contact Us
        </div>
      </div>
    </header>
  );
};

export default BookingHeader;
