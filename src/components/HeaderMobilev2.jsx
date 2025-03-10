import React from "react";
import TruckIcon from "./TruckIcon";

const BookingHeader = () => {
  return (
    <header className="text-white bg-gray-950">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3.5">
        {/* Left: Brand */}
        <div className="text-lg font-semibold">Welcome Removal</div>
      </div>
    </header>
  );
};

export default BookingHeader;
