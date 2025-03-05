import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-2 bg-white border-gray-200 z-[200] border-1 shadow-gray-100">
      {/* Use a container to keep the content centered */}
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo / Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-950">
              Welcome Removal
            </span>
            {/* Small upward arrow (SVG icon) */}
            <svg
              className="w-4 h-4 text-blue-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V6M5 13l7-7 7 7" />
            </svg>
          </div>
          {/* Middle Section: Navigation Links */}
          <nav className="justify-center py-5 space-x-8 text-gray-900 text-md md:flex">
            <a
              href="#removal-services"
              className="transition-colors hover:text-gray-500"
            >
              Removal Services
            </a>
            <a
              href="#booking-form"
              className="transition-colors hover:text-gray-500"
            >
              Book a Spot Now
            </a>
            <a
              href="#booking-steps"
              className="transition-colors hover:text-gray-500"
            >
              How Removal Works
            </a>
            <a
              href="#removal-services"
              className="transition-colors hover:text-gray-500"
            >
              Customer Protection
            </a>
          </nav>
          {/* Right Section: Sign in */}
          <div>
            <a
              href="#"
              className="px-8 py-3.5 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:text-white"
            >
              Contact Us 07943059792{" "}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
