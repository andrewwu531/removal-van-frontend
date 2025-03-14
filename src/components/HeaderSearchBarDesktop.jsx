import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";

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

export default function HeaderDesktop({
  onSearch,
  currentService,
  currentLocation,
}) {
  const [location, setLocation] = useState(currentLocation || "");
  const [service, setService] = useState(currentService || "");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const locationDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const locationInputRef = useRef(null);
  const serviceInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && locationInputRef.current) {
        if (
          !locationDropdownRef.current.contains(event.target) &&
          !locationInputRef.current.contains(event.target)
        ) {
          setShowLocationDropdown(false);
        }
      }

      if (serviceDropdownRef.current && serviceInputRef.current) {
        if (
          !serviceDropdownRef.current.contains(event.target) &&
          !serviceInputRef.current.contains(event.target)
        ) {
          setShowServiceDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setService(currentService || "");
  }, [currentService]);

  useEffect(() => {
    setLocation(currentLocation || "");
  }, [currentLocation]);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocationDropdown(false);
    onSearch({
      service: currentService,
      location: selectedLocation,
    });
  };

  const handleServiceSelect = (selectedService) => {
    setService(selectedService);
    setShowServiceDropdown(false);
    onSearch({
      service: selectedService,
      location: location,
    });
  };

  return (
    <div className="flex flex-col items-center pb-5 pt-7 z-100">
      <img src={logo} alt="logo" className="absolute w-10 h-10 top-6 left-8" />
      <div className="flex items-center w-full max-w-2xl px-4 py-2 bg-white rounded-full shadow-md">
        <div className="relative flex-1">
          <input
            ref={locationInputRef}
            type="text"
            className="w-full p-2 font-sans text-black rounded-full outline-none"
            placeholder="Your Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowLocationDropdown(true)}
          />
          {showLocationDropdown && (
            <div
              ref={locationDropdownRef}
              className="absolute left-0 z-50 w-full mt-2 bg-white rounded-lg shadow-md"
            >
              {locations.map((city) => (
                <div
                  key={city}
                  className={`p-2 cursor-pointer hover:bg-gray-100 
                    ${location === city ? "bg-gray-50 text-red-500" : ""}`}
                  onClick={() => handleLocationSelect(city)}
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
            ref={serviceInputRef}
            type="text"
            className="w-full p-2 text-black rounded-full outline-none"
            placeholder="Service Type"
            value={service}
            onChange={(e) => setService(e.target.value)}
            onFocus={() => setShowServiceDropdown(true)}
          />
          {showServiceDropdown && (
            <div
              ref={serviceDropdownRef}
              className="absolute left-0 z-50 w-full mt-2 bg-white rounded-lg shadow-md"
            >
              {services.map((type) => (
                <div
                  key={type}
                  className={`p-2 cursor-pointer hover:bg-gray-100
                    ${service === type ? "bg-gray-50 text-red-500" : ""}`}
                  onClick={() => handleServiceSelect(type)}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="p-3 ml-2 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
          onClick={() => onSearch({ service, location })}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

HeaderDesktop.propTypes = {
  onSearch: PropTypes.func.isRequired,
  currentService: PropTypes.string,
  currentLocation: PropTypes.string,
};

HeaderDesktop.defaultProps = {
  currentService: "Removal",
  currentLocation: "",
};
