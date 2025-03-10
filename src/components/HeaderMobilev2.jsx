import React from "react";

const BookingHeader = () => {
  return (
    <header className="text-white bg-indigo-600">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left: Brand */}
        <div className="text-xl font-semibold">Welcome Removal</div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu */}
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Nav (Stays / Flights / Flight + Hotel) */}
      <nav className="flex items-center justify-start px-4 pb-4 space-x-4 bg-indigo-600">
        {/* Flights */}
        <button className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none">
          {/* Plane icon */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19l-1-2-7-5 7-5 1-2c.46.302 1.05.483 1.765.539l8.43 7.461-8.43 7.461c-.715.056-1.305-.237-1.765-.461z"
            />
          </svg>
          <span className="font-medium">Residential</span>
        </button>

        {/* Flight + Hotel */}
        <button className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none">
          {/* Briefcase / Baggage icon (or any icon you prefer) */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 4h.01M20 12H4m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2h-1m-10 0H6a2 2 0 00-2 2v3"
            />
          </svg>
          <span className="font-medium">Business Relocation</span>
        </button>
      </nav>
    </header>
  );
};

export default BookingHeader;
