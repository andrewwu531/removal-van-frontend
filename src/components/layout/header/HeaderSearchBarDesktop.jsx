import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { locations } from "./constants/locations";
import { services } from "./constants/services";
import SearchInput from "./components/SearchInput";
import EnquiryButton from "./components/EnquiryButton";

export default function HeaderSearchBarDesktop({
  onSearch,
  currentService = "Removal",
  currentLocation = "",
}) {
  const [location, setLocation] = useState(currentLocation || "");
  const [service, setService] = useState(currentService || "");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showEnquiryButton, setShowEnquiryButton] = useState(false);

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
      // For location dropdown
      const isLocationDropdownVisible = showLocationDropdown;
      const clickedInLocation =
        locationInputRef.current?.contains(event.target) ||
        locationDropdownRef.current?.contains(event.target);

      // For service dropdown
      const isServiceDropdownVisible = showServiceDropdown;
      const clickedInService =
        serviceInputRef.current?.contains(event.target) ||
        serviceDropdownRef.current?.contains(event.target);

      // Close location dropdown if it's open and clicked outside
      if (isLocationDropdownVisible && !clickedInLocation) {
        setShowLocationDropdown(false);
      }

      // Close service dropdown if it's open and clicked outside
      if (isServiceDropdownVisible && !clickedInService) {
        setShowServiceDropdown(false);
      }

      // Handle enquiry button
      if (
        enquiryCardRef.current &&
        !enquiryCardRef.current.contains(event.target) &&
        !enquiryButtonRef.current.contains(event.target)
      ) {
        setShowEnquiryButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLocationDropdown, showServiceDropdown]);

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
    navigate("/");
    if (typeof onSearch === "function") {
      onSearch({ service: currentService, location: "" });
    }
  };

  const handleEnquiryClick = () => {
    setShowEnquiryButton(!showEnquiryButton);
  };

  const handleLocationFocus = () => {
    setShowServiceDropdown(false);
    setShowLocationDropdown(true);
  };

  const handleServiceFocus = () => {
    setShowLocationDropdown(false);
    setShowServiceDropdown(true);
  };

  return (
    <div className="flex flex-col items-center pt-5 mx-6 min-[1920px]:pt-6 z-100">
      <img
        src={logo}
        alt="logo"
        className="absolute w-9 h-9 min-[1339px]:w-10 min-[1339px]:h-10 min-[1920px]:w-11 min-[1920px]:h-11 cursor-pointer top-7 min-[1339px]:top-7 left-10 min-[1920px]:left-11 max-[500px]:hidden"
        onClick={handleLogoClick}
      />
      <div
        className="flex items-center w-full max-w-sm min-[500px]:max-w-lg min-[1339px]:max-w-xl min-[1920px]:max-w-2xl px-4 min-[1920px]:px-5 py-2 min-[1920px]:py-3 bg-white rounded-full shadow-md min-[500px]:mr-7"
        role="search"
        aria-label="Search traders"
      >
        <div className="relative flex-1">
          <label htmlFor="locationInput" className="sr-only">
            Your Location
          </label>
          <SearchInput
            inputRef={locationInputRef}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Your Location"
            showDropdown={showLocationDropdown}
            onFocus={handleLocationFocus}
            dropdownRef={locationDropdownRef}
            items={locations}
            onSelect={handleLocationSelect}
            id="locationInput"
            name="locationInput"
            autoComplete="address-level2"
            aria-expanded={showLocationDropdown}
            aria-haspopup="listbox"
            aria-controls="location-listbox"
          />
        </div>

        <div
          className="h-6 mx-2 border-l border-gray-300"
          role="separator"
        ></div>

        <div className="relative flex-1">
          <label htmlFor="serviceInput" className="sr-only">
            Service Type
          </label>
          <SearchInput
            inputRef={serviceInputRef}
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Service Type"
            showDropdown={showServiceDropdown}
            onFocus={handleServiceFocus}
            dropdownRef={serviceDropdownRef}
            items={services}
            onSelect={handleServiceSelect}
            id="serviceInput"
            name="serviceInput"
            autoComplete="off"
            aria-expanded={showServiceDropdown}
            aria-haspopup="listbox"
            aria-controls="service-listbox"
          />
        </div>

        <button
          className="p-3 ml-2 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
          onClick={handleSearchClick}
          aria-label="Search traders"
          type="button"
        >
          <FaSearch />
        </button>
      </div>

      <button
        ref={enquiryButtonRef}
        className="absolute right-10 mt-1 min-[1920px]:mt-1.5 px-6.5 min-[1920px]:px-8 py-3 min-[1920px]:py-3.5 text-base min-[1920px]:text-lg text-white font-semibold transition-colors bg-red-500 rounded-full hover:scale-103 max-[500px]:hidden"
        onClick={handleEnquiryClick}
        type="button"
        aria-expanded={showEnquiryButton}
        aria-haspopup="dialog"
      >
        General Enquiry
      </button>

      {showEnquiryButton && (
        <EnquiryButton
          onClose={() => setShowEnquiryButton(false)}
          cardRef={enquiryCardRef}
        />
      )}
    </div>
  );
}

HeaderSearchBarDesktop.propTypes = {
  onSearch: PropTypes.func.isRequired,
  currentService: PropTypes.string,
  currentLocation: PropTypes.string,
};
