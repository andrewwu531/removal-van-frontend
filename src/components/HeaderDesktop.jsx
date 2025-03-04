import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-gray-200">
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

          {/* Right Section: Sign in */}
          <div>
            <a
              href="#"
              className="px-5 py-2.5 text-blue-900 transition-colors border border-blue-900 rounded hover:bg-teal-500 hover:text-white"
            >
              Contact Us Now at 07943059792{" "}
            </a>
          </div>
        </div>
      </div>
      {/* Middle Section: Navigation Links */}
      <nav className="justify-center py-5 space-x-8 font-semibold text-white bg-indigo-700 text-md md:flex">
        <a href="#" className="transition-colors hover:text-teal-500">
          Removal Services
        </a>
        <a href="#" className="transition-colors hover:text-teal-500">
          Book a Spot Now
        </a>
        <a href="#" className="transition-colors hover:text-teal-500">
          How Removal Works
        </a>
        <a href="#" className="transition-colors hover:text-teal-500">
          Customer Protection
        </a>
      </nav>
    </header>
  );
};

export default Header;
