import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const locations = [
  "London",
  "Birmingham",
  "Manchester",
  "Glasgow",
  "Leeds",
  "Liverpool",
  "Newcastle",
  "Sheffield",
  "Bristol",
  "Edinburgh",
];

const services = [
  "Removal",
  "House Renovation",
  "Carpet & Flooring",
  "Painting",
  "Damage Repair",
  "Electricity & Gas",
  "Lock Smith",
  "Solar Panels",
  "Window & Heating & Ventilation",
  "Car",
];

export default function HeaderDesktop() {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  return (
    <div className="flex flex-col items-center p-4 z-100">
      <div className="flex items-center w-full max-w-2xl px-4 py-2 bg-white rounded-full shadow-md">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full p-2 font-sans text-black rounded-full outline-none"
            placeholder="Your Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowLocationDropdown(true)}
          />
          {showLocationDropdown && (
            <div className="absolute left-0 w-full mt-2 bg-white rounded-lg shadow-md">
              {locations.map((city) => (
                <div
                  key={city}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setLocation(city);
                    setShowLocationDropdown(false);
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-6 mx-2 border-l border-gray-300"></div>

        <div className="relative flex-1">
          <input
            type="text"
            className="w-full p-2 text-black rounded-full outline-none"
            placeholder="Service Type"
            value={service}
            onChange={(e) => setService(e.target.value)}
            onFocus={() => setShowServiceDropdown(true)}
          />
          {showServiceDropdown && (
            <div className="absolute left-0 w-full mt-2 bg-white rounded-lg shadow-md">
              {services.map((type) => (
                <div
                  key={type}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setService(type);
                    setShowServiceDropdown(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="p-3 ml-2 text-white bg-red-500 rounded-full">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
