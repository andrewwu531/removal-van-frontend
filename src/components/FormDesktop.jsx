import React from "react";

const FormDesktop = () => {
  return (
    <div className="font-sans" id="booking-form">
      <div className="max-w-screen-xl mx-auto mt-10 mb-32">
        {/* Top Section: Header with Image */}
        <div className="relative flex items-center py-10 text-white bg-indigo-600 rounded-lg px-11">
          <h1 className="text-3xl font-semibold">Book Removal Appointment</h1>
        </div>

        {/* Main Content: Form */}
        <div className="grid grid-cols-3">
          {/* Left Column: Form Fields */}
          <div className="col-span-2 ">
            {/* Personal Details */}
            <div className="px-12 pt-10 mr-10 bg-white ">
              <h2 className="mt-1 mb-6 text-2xl font-semibold text-gray-700">
                Personal Details
              </h2>
              <div className="grid grid-cols-2 space-x-5">
                <div className="mb-3">
                  <label className="block font-medium text-gray-700 text-md">
                    Name
                  </label>
                  <input
                    type="text"
                    className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block font-medium text-gray-700 text-md">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 text-md">
                  Telephone
                </label>
                <input
                  type="tel"
                  className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <h2 className="mt-10 mb-5 text-2xl font-semibold text-gray-700">
                Removal Information
              </h2>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 text-md">
                  Pickup Location
                </label>
                <input
                  type="text"
                  className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 text-md">
                  Dropoff Location
                </label>
                <input
                  type="text"
                  className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 text-md">
                  Deposit Amount
                </label>
                <div className="relative">
                  <select className="block p-3 mt-1 bg-white border border-gray-300 rounded w-35 focus:outline-none">
                    <option>£60</option>
                    <option>£100</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Next Step Button */}
            <div className="text-left">
              <button className="ml-10 mt-10 px-11 py-4.5 font-semibold text-xl text-white bg-amber-500 rounded-lg hover:bg-[#e07b17] focus:outline-none focus:ring-2 focus:ring-[#ff851b] focus:ring-opacity-50">
                Next Step
              </button>
            </div>
          </div>

          {/* Right Column: Customer Reviews */}
          <div className="hidden lg:block">
            <div className="pt-6 pl-2 pr-12">
              <p className="mt-8 mb-10 text-3xl font-semibold text-gray-700">
                Customer Reviews
              </p>
              <div className="relative max-w-lg p-6.5 shadow-md py-7 bg-gray-50 rounded-2xl">
                <p className="text-gray-700 text-">
                  "I obtained a fair quote quickly and found Welcome Removal
                  offers the best value for money in terms of services and peace
                  of mind. Would highly recommend them. Thank you again to you
                  and your team." - Claire
                </p>
              </div>
              <div className="flex justify-end mt-5 space-x-2 font-semibold text-gray-700 text-md">
                <span>Overall Rating</span> <span>⭐⭐⭐⭐⭐</span>
              </div>

              <div className="relative max-w-lg p-6.5 mt-10 shadow-md py-7 bg-gray-50 rounded-2xl">
                <p className="text-gray-700 text-md">
                  "Welcome Removal was brilliant! They moved my furniture on the
                  coldest days of the year and they are really cheerful and
                  helpful. I felt really looked after by them!" - Jordon
                </p>
              </div>
              <div className="flex justify-end mt-5 space-x-2 font-semibold text-gray-700 text-md">
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
