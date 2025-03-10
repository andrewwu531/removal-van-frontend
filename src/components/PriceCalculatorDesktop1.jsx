import { useState } from "react";

const PriceCalculatorDesktop = () => {
  const [removalType, setRemovalType] = useState("home");
  const [optionValue, setOptionValue] = useState("1");
  const [removalLocation, setRemovalLocation] = useState("Glasgow"); // NEW: Added removal location state

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

  // NEW: Determine additional cost based on removal location
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

  return (
    <div className="relative flex flex-row items-center justify-center p-6 mt-3 min-[2000px]:mt-7 min-[2560px]:mt-10 min-[3840px]:mt-14 mb-16 min-[2200px]:mb-6 bg-white">
      {/* Left side: Form fields */}
      <div className="w-full max-w-lg min-[2200px]:max-w-2xl min-[2560px]:max-w-3xl min-[3840px]:max-w-4xl py-16 min-[2200px]:pb-24 min-[2560px]:pb-28 min-[2200px]:pt-12  min-[2560px]:pt-18 min-[3840px]:pt-26 bg-white shadow-lg px-28 min-[2200px]:px-38 rounded-3xl">
        <h2 className="mb-8 min-[2200px]:mb-10 min-[2560px]:mb-14 min-[3840px]:mb-16 text-2xl min-[2200px]:text-3xl  min-[2560px]:text-4xl font-semibold">
          Removal Quote Calculator
        </h2>

        {/* Removal Type */}
        <label className="block mb-1  min-[2560px]:mb-1.5 min-[3840px]:mb-2 font-semibold  min-[2560px]:text-xl min-[3840px]:text-2xl text-gray-700">
          Removal Type
        </label>
        <select
          value={removalType}
          onChange={handleRemovalTypeChange}
          className="w-full p-2 min-[2200px]:p-2.5  min-[2560px]:p-3.5 min-[3840px]:p-4 pl-3.5 min-[2200px]:pl-4  min-[2560px]:pl-5 min-[3840px]:pl-6 pr-2 mb-4  min-[2560px]:text-xl border border-gray-400 rounded-md min-[2560px]:rounded-lg focus:outline-none appearance-none arrow-lg"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='7.5' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23555' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.65rem center",
            backgroundSize: "0.65rem auto",
          }}
        >
          <option value="home" className=" min-[2560px]:text-xl">
            Home Removal
          </option>
          <option value="business" className=" min-[2560px]:text-xl">
            Business Removal
          </option>
        </select>

        {/* Dynamic Field: Number of Bedrooms OR Office Size */}
        <label className="block mb-1  min-[2560px]:mb-1.5 min-[3840px]:mb-2 min-[2560px]:text-xl min-[3840px]:text-2xl font-semibold text-gray-700">
          {removalType === "home"
            ? "Number of Applicable Bedrooms"
            : "Office Size (square foot)"}
        </label>
        <select
          value={optionValue}
          onChange={handleOptionValueChange}
          className="w-full p-2 min-[2200px]:p-2.5  min-[2560px]:p-3.5 pl-3.5 min-[2200px]:pl-4  min-[2560px]:pl-5 pr-2 mb-4   min-[2560px]:text-xl border border-gray-400 rounded-md min-[2560px]:rounded-lg appearance-none focus:outline-none arrow-lg"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='7.5' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23555' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.65rem center",
            backgroundSize: "0.65rem auto",
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

        {/* NEW: Removal Location Section */}
        <label className="block mb-1 min-[2560px]:mb-1.5 min-[3840px]:mb-2 font-semibold min-[2560px]:text-xl min-[3840px]:text-2xl text-gray-700">
          Removal Pickup Location
        </label>
        <select
          value={removalLocation}
          onChange={(e) => setRemovalLocation(e.target.value)}
          className="w-full p-2 min-[2200px]:p-2.5 min-[2560px]:p-3.5 pl-3.5 min-[2200px]:pl-4 min-[2560px]:pl-5 pr-2 mb-4 min-[2560px]:text-xl border border-gray-400 rounded-md min-[2560px]:rounded-lg appearance-none focus:outline-none arrow-lg"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='7.5' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23555' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.65rem center",
            backgroundSize: "0.65rem auto",
          }}
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

      {/* Right side: Cost breakdown with overlap effect */}
      <div className="relative z-10 w-full max-w-md min-[2200px]:max-w-lg min-[3840px]:max-w-2xl mt-6 min-[2200px]:-mt-2 -ml-10 min-[2200px]:-ml-16 text-white bg-indigo-600 shadow-lg py-14 min-[2200px]:py-17 min-[3840px]:py-20 px-14 min-[2200px]:px-18 min-[3840px]:px-22 rounded-xl">
        <h3 className="text-xl min-[2200px]:text-2xl min-[3840px]:text-3xl font-bold">
          Estimated Removal Quote
        </h3>
        <p className="mt-4 min-[2200px]:mt-6 min-[2560px]:mt-8 min-[3840px]:mt-9 text-3xl min-[2200px]:text-4xl font-extrabold">
          £{totalPrice}
        </p>
        <p className="mt-3 min-[2200px]:mt-5 min-[2560px]:mt-7 text-md min-[2200px]:text-lg min-[3840px]:text-xl">
          (Deposit: £{deposit}, with 2 men included)
        </p>
        <div className="mt-7 text-md min-[2200px]:text-lg min-[3840px]:text-xl">
          Feel free to contact us and provide your removal details: Name, Pickup
          & Drop-Off Location, Available Removal Dates, and Removal Descriptions
          for quote confirmation.
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorDesktop;
