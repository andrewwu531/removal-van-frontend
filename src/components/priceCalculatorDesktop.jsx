import { useState } from "react";

const PriceCalculatorDesktop = () => {
  const [removalType, setRemovalType] = useState("home");
  const [optionValue, setOptionValue] = useState("1");

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

  return (
    <div className="relative flex flex-row items-center justify-center p-6 mt-3 bg-white">
      {/* Left side: Form fields */}
      <div className="w-full max-w-lg py-16 bg-white shadow-lg px-28 rounded-3xl">
        <h2 className="mb-8 text-2xl font-semibold">
          Removal Quote Calculator
        </h2>

        {/* Removal Type */}
        <label className="block mb-1 font-semibold text-gray-700">
          Removal Type
        </label>
        <select
          value={removalType}
          onChange={handleRemovalTypeChange}
          className="w-full p-2 pl-3.5 pr-2 mb-4 border rounded-lg focus:outline-none appearance-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23333' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.65rem center",
            backgroundSize: "0.65em auto",
          }}
        >
          <option value="home">Home Removal</option>
          <option value="business">Business Removal</option>
        </select>

        {/* Dynamic Field: Number of Bedrooms OR Office Size */}
        <label className="block mb-1 font-semibold text-gray-700">
          {removalType === "home"
            ? "Number of Applicable Bedrooms"
            : "Office Size (square foot)"}
        </label>
        <select
          value={optionValue}
          onChange={handleOptionValueChange}
          className="w-full p-2 pl-3.5 mb-4 border rounded-lg appearance-none focus:outline-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23333' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.65rem center",
            backgroundSize: "0.65em auto",
          }}
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

        <button className="w-full p-2 mt-4 text-white transition bg-indigo-600 rounded-lg hover:bg-blue-700">
          Next
        </button>
      </div>

      {/* Right side: Cost breakdown with overlap effect */}
      <div className="relative z-10 w-full max-w-md mt-6 -ml-10 text-white bg-indigo-600 shadow-lg py-14 px-14 rounded-xl">
        <h3 className="text-xl font-bold">Estimated Removal Quote</h3>
        <p className="mt-4 text-3xl font-extrabold">£{basePrice}</p>
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

export default PriceCalculatorDesktop;
