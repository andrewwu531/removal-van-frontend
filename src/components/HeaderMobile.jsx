import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Use a container to keep the content centered */}
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo / Brand */}
          <div className="flex items-center space-x-1">
            <span className="text-xl font-semibold text-gray-900">
              lightmove
            </span>
            {/* Small upward arrow (SVG icon) */}
            <svg
              className="w-3 h-3 text-teal-500"
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
          <nav className="hidden space-x-6 text-gray-700 md:flex">
            <a href="#" className="transition-colors hover:text-teal-500">
              Buy
            </a>
            <a href="#" className="transition-colors hover:text-teal-500">
              Rent
            </a>
            <a href="#" className="transition-colors hover:text-teal-500">
              Monetize
            </a>
            <a href="#" className="transition-colors hover:text-teal-500">
              FindAgent
            </a>
            <a href="#" className="transition-colors hover:text-teal-500">
              Commercial
            </a>
            <a href="#" className="transition-colors hover:text-teal-500">
              Inspire
            </a>
            <a href="#" className="transition-colors hover:text-teal-500">
              Reviews
            </a>
          </nav>

          {/* Right Section: Sign in */}
          <div>
            <a
              href="#"
              className="px-4 py-2 text-teal-500 transition-colors border border-teal-500 rounded hover:bg-teal-500 hover:text-white"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
