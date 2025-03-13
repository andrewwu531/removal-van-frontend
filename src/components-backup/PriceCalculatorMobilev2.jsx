import { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaBed,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

const BookingInterface = () => {
  const [removalType, setRemovalType] = useState("home");
  const [optionValue, setOptionValue] = useState("1");
  const [removalLocation, setRemovalLocation] = useState("Glasgow");

  const handleRemovalTypeChange = (event) => {
    const type = event.target.value;
    setRemovalType(type);
    // Reset option value based on removal type:
    if (type === "home") {
      setOptionValue("1");
    } else {
      setOptionValue("1000"); // Default business option
    }
  };

  const handleOptionValueChange = (event) => {
    setOptionValue(event.target.value);
  };

  // Price mappings for home and business removals
  const homePrices = {
    1: 185,
    2: 300,
    3: 400,
    4: 450,
    5: 500,
  };

  const businessPrices = {
    1000: 185,
    2000: 300,
    3000: 400,
    4000: 450,
  };

  // Calculate base price and deposit based on removal type and option selected
  let basePrice, deposit;
  if (removalType === "home") {
    basePrice = homePrices[optionValue];
    deposit = optionValue === "1" ? 60 : 100;
  } else {
    basePrice = businessPrices[optionValue];
    deposit = optionValue === "1000" ? 60 : 100;
  }

  // Determine additional cost based on removal location
  let additionalCost = 0;
  if (removalLocation === "London") {
    additionalCost = 30;
  } else if (
    ["Manchester", "Birmingham", "Sheffield", "Leeds", "Liverpool"].includes(
      removalLocation
    )
  ) {
    additionalCost = 15;
  }
  const totalPrice = basePrice + additionalCost;

  // Common style for select background arrow
  const selectStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23555' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.65rem center",
    backgroundSize: "0.65rem auto",
  };

  return (
    <div className="flex flex-col items-center px-4 bg-white mt-18 py-7">
      {/* Header / Title */}
      <div className="flex flex-col justify-center w-full pl-3 mx-auto mb-6 text-center">
        <h1 className="mb-1.5 text-2xl font-bold text-gray-900">
          Removal Quote Calculator
        </h1>
        <p className="text-gray-700">Search removal prices within the UK</p>
      </div>

      {/* Search Form */}
      <div className="w-full max-w-md px-6 bg-white">
        <form>
          <div className="grid grid-cols-1">
            {/* Removal Type */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">
                Removal Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-3 bottom-3">
                  {removalType === "home" ? (
                    <FaHome className="w-6 h-6 text-gray-400" />
                  ) : (
                    <FaBriefcase className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <select
                  value={removalType}
                  onChange={handleRemovalTypeChange}
                  className="w-full p-3 pl-12 pr-2 mb-4 border border-gray-300 rounded appearance-none focus:outline-none"
                  style={selectStyle}
                >
                  <option value="home">Home Removal</option>
                  <option value="business">Business Removal</option>
                </select>
              </div>
            </div>

            {/* Bedrooms / Office Size */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">
                {removalType === "home"
                  ? "Number of Applicable Bedrooms"
                  : "Office Size (square foot)"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-3 bottom-3">
                  {removalType === "home" ? (
                    <FaBed className="w-6 h-6 text-gray-400" />
                  ) : (
                    <FaBuilding className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <select
                  value={optionValue}
                  onChange={handleOptionValueChange}
                  className="w-full p-3 pl-12 pr-2 mb-4 border border-gray-300 rounded appearance-none focus:outline-none"
                  style={selectStyle}
                >
                  {removalType === "home" ? (
                    <>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </>
                  ) : (
                    <>
                      <option value="1000">1000 sf</option>
                      <option value="2000">2000 sf</option>
                      <option value="3000">3000 sf</option>
                      <option value="4000">4000 sf</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Removal Pickup Location */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">
                Removal Pickup Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  value={removalLocation}
                  onChange={(e) => setRemovalLocation(e.target.value)}
                  className="w-full p-3 pl-12 pr-2 border border-gray-300 rounded appearance-none focus:outline-none"
                  style={selectStyle}
                >
                  <option value="Glasgow">Glasgow</option>
                  <option value="Edinburgh">Edinburgh</option>
                  <option value="London">London</option>
                  <option value="Manchester">Manchester</option>
                  <option value="Birmingham">Birmingham</option>
                  <option value="Sheffield">Sheffield</option>
                  <option value="Leeds">Leeds</option>
                  <option value="Liverpool">Liverpool</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Right side: Cost breakdown */}
      <div className="z-10 flex flex-col justify-center w-11/12 px-10 py-10 mx-auto mt-8 text-white bg-indigo-600 shadow-lg rounded-2xl">
        <h3 className="text-xl font-bold">Estimated Removal Quote</h3>
        <p className="mt-4 text-3xl font-extrabold">£{totalPrice}</p>
        <p className="mt-3 text-md">
          (Deposit: £{deposit}, with 2 men included)
        </p>
        <div className="mt-7 text-md">
          Feel free to contact us and provide your removal details: Name, Pickup
          & Drop-Off Location, Available Removal Dates, and Removal Descriptions
          for quote confirmation.
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;
