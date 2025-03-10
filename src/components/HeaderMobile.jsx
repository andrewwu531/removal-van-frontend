import React, { useState } from "react";

const HeaderMobile = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-[200]">
      {/* Container with w-11/12 to provide spacing on the x-axis */}
      <div className="flex flex-col justify-center w-5/6 mx-auto space-y-1">
        <div className="flex items-center justify-between pt-2 h-11">
          {/* Left Section: Logo / Brand and upward arrow */}
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
          {/* Right Section: Burger Icon */}
          <button onClick={toggleNav} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {/* Conditionally render the nav section */}
        {isNavOpen && (
          <nav className="flex flex-col items-center pt-5 mt-5 space-y-4 text-lg text-gray-900 mb-7">
            <a
              href="#removal-services"
              className="py-0.5 transition-colors hover:text-gray-500"
            >
              Removal Services
            </a>
            <a
              href="#booking-form"
              className="py-0.5 transition-colors hover:text-gray-500"
            >
              Book a Spot Now
            </a>
            <a
              href="#booking-steps"
              className="py-0.5 transition-colors hover:text-gray-500"
            >
              How Removal Works
            </a>
            <a
              href="#removal-services"
              className="tra0.5sition-colors py-2 hover:text-gray-500 hidden min-[1256px]:inline"
            >
              Customer Protection
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderMobile;
