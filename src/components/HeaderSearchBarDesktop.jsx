import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const routerLocation = useLocation();
  const isTraderDetailsPage = routerLocation.pathname.match(/^\/\d+$/);

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

    if (isTraderDetailsPage) {
      navigate("/", {
        state: {
          selectedService: service,
          selectedLocation: selectedLocation,
        },
      });
    }

    onSearch({
      service: service,
      location: selectedLocation,
    });
  };

  const handleServiceSelect = (selectedService) => {
    setService(selectedService);
    setShowServiceDropdown(false);

    if (isTraderDetailsPage) {
      navigate("/", {
        state: {
          selectedService: selectedService,
          selectedLocation: location,
        },
      });
    }

    onSearch({
      service: selectedService,
      location: location,
    });
  };

  const handleSearchClick = () => {
    if (isTraderDetailsPage) {
      navigate("/", {
        state: {
          selectedService: service,
          selectedLocation: location,
        },
      });
    }

    onSearch({ service, location });
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
          onClick={handleSearchClick}
        >
          <FaSearch />
        </button>
      </div>
      {/* General Enquiry Button */}
      <button className="absolute right-10 px-6.5 py-3 text-white font-semibold transition-colors bg-red-500 rounded-full  hover:scale-103">
        General Enquiry
      </button>
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
