import React from "react";

const FormDesktop = () => {
  return (
    <div className="min-h-screen font-sans">
      <div className="py-10 mx-auto px-90">
        {/* Top Section: Header with Image */}
        <div className="relative flex items-center px-6 text-white bg-indigo-600 rounded-lg py-9">
          <h1 className="text-3xl font-semibold">Book Removal Appointment</h1>
        </div>

        {/* Main Content: Form */}
        <div className="grid grid-cols-3">
          {/* Left Column: Form Fields */}
          <div className="col-span-2 ">
            {/* Personal Details */}
            <div className="p-10 mr-10 bg-white ">
              <h2 className="mt-1 mb-6 text-2xl font-semibold text-gray-700">
                Personal Details
              </h2>
              <div className="grid grid-cols-2 space-x-5">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff851b]"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff851b]"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Telephone
                </label>
                <input
                  type="tel"
                  className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff851b]"
                />
              </div>

              <h2 className="mt-10 mb-5 text-2xl font-semibold text-gray-700">
                Removal Information
              </h2>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Location
                </label>
                <input
                  type="text"
                  className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff851b]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Dropoff Location
                </label>
                <input
                  type="text"
                  className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff851b]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Deposit Amount
                </label>
                <select className="block w-35 p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff851b]">
                  <option>£60</option>
                  <option>£100</option>
                </select>
              </div>
            </div>

            {/* Next Step Button */}
            <div className="text-left">
              <button className="ml-10 px-11 py-4 font-semibold text-lg text-white bg-[#ff851b] rounded-lg hover:bg-[#e07b17] focus:outline-none focus:ring-2 focus:ring-[#ff851b] focus:ring-opacity-50">
                Next Step
              </button>
            </div>
          </div>

          {/* Right Column: Customer Reviews */}
          <div className="hidden lg:block">
            <div className="p-6">
              <p className="mt-10 mb-6 text-2xl font-bold text-gray-700">
                Customer Reviews
              </p>
              <div className="relative max-w-lg p-5 shadow-md py-7 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-800">
                  "I obtained a fair quote quickly and found Welcome Removal
                  offers the best value for money in terms of services and peace
                  of mind. Would highly recommend them. Thank you again to you
                  and your team." - Claire
                </p>
              </div>
              <div className="flex justify-end mt-3 space-x-2 font-semibold text-gray-700 text-md">
                <span>Overall Rating</span> <span>⭐⭐⭐⭐⭐</span>
              </div>

              <div className="relative max-w-lg p-5 mt-10 shadow-md py-7 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-800">
                  "Welcome Removal was brilliant! They moved my furniture on the
                  coldest days of the year and they are really cheerful and
                  helpful. I felt really looked after by them!" - Jordon
                </p>
              </div>
              <div className="flex justify-end mt-3 space-x-2 font-semibold text-gray-700 text-md">
                <span>Overall Rating</span> <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDesktop;
