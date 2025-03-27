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
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const locationDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const locationInputRef = useRef(null);
  const serviceInputRef = useRef(null);
  const enquiryCardRef = useRef(null);
  const enquiryButtonRef = useRef(null);

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

      if (
        enquiryCardRef.current &&
        !enquiryCardRef.current.contains(event.target) &&
        !enquiryButtonRef.current.contains(event.target)
      ) {
        setShowEnquiryModal(false);
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

  const handleLogoClick = () => {
    setLocation("");
    setService("Removal");

    navigate("/", {
      state: {
        selectedService: "Removal",
        selectedLocation: "",
      },
    });

    onSearch({
      service: "Removal",
      location: "",
    });
  };

  const handleEnquiryClick = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  return (
    <div className="flex flex-col items-center pt-5 min-[1920px]:pt-6 z-100">
      <img
        src={logo}
        alt="logo"
        className="absolute w-9 h-9 min-[1339px]:w-10 min-[1339px]:h-10 min-[1920px]:w-11 min-[1920px]:h-11 cursor-pointer top-7 min-[1339px]:top-7 left-10 min-[1920px]:left-11"
        onClick={handleLogoClick}
      />
      <div className="flex items-center w-full max-w-lg min-[1339px]:max-w-xl min-[1920px]:max-w-2xl px-4 min-[1920px]:px-5 py-2 min-[1920px]:py-3 bg-white rounded-full shadow-md mr-7">
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
      <button
        ref={enquiryButtonRef}
        className="absolute right-10 mt-1 min-[1920px]:mt-1.5 px-6.5 min-[1920px]:px-8 py-3 min-[1920px]:py-3.5 text-base min-[1920px]:text-lg text-white font-semibold transition-colors bg-red-500 rounded-full hover:scale-103"
        onClick={handleEnquiryClick}
      >
        General Enquiry
      </button>

      {/* Enquiry Card */}
      {showEnquiryModal && (
        <div
          ref={enquiryCardRef}
          className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-9 px-9 top-20 right-10 w-90"
        >
          <button
            className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            onClick={() => setShowEnquiryModal(false)}
          >
            ✕
          </button>
          <h2 className="mb-4 text-xl font-bold text-gray-800">Contact Us</h2>
          <p className="mb-5 text-gray-600">
            For general enquiries, please contact us by text or phone call at:
          </p>
          <div className="mb-5 text-xl font-semibold text-center text-red-400">
            07943 059 792
          </div>
          <p className="text-sm text-left text-gray-500">
            * Our team is available Monday to Sunday from 9am - 8pm
          </p>
        </div>
      )}
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
