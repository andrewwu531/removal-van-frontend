import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import Stage3LoadingDesktop from "./Stage3LoadingDesktop";

// Add a mapping object for custom service titles
const serviceDisplayTitles = {
  Removal: "Removal Services",
  "House Renovation": "Home Renovation",
  "Carpet & Flooring": "Carpet & Flooring",
  Painting: "Painting Services",
  "Damage Repair": "Damage Repair",
  "Electricity & Gas": "Electrical & Gas Services",
  "Lock Smith": "Locksmith",
  "Solar Panels": "Solar Installation",
  "Window & Heating": "Window & HVAC Specialists",
  Car: "Automotive Services",
};

export default function Traders_Collections({
  traders,
  currentService,
  onTraderSelect,
}) {
  const navigate = useNavigate();
  const [showNoTraders, setShowNoTraders] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Reset both states when traders changes
    setShowNoTraders(false);
    setShowLoading(false);

    // Set a timer to show loading after 5 seconds
    const loadingTimer = setTimeout(() => {
      setShowLoading(true);
    }, 5000);

    // Set a timer to show the "no traders" message after loading shows
    const noTradersTimer = setTimeout(() => {
      setShowNoTraders(true);
    }, 10000); // 5 seconds after loading appears

    // Cleanup timers on component unmount or when traders changes
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(noTradersTimer);
    };
  }, [traders]); // Reset timers when traders array changes

  // Update getImageUrl to handle Azure URLs
  const getImageUrl = (photoPath) => {
    if (!photoPath) return "/fallback-image.png";

    // If it's already a full Azure URL, return it
    if (photoPath.startsWith("https://")) return photoPath;

    // If it's a relative path, construct the Azure URL
    if (photoPath.startsWith("/media/")) {
      // Remove any duplicate 'traders' in the path
      const cleanPath = photoPath
        .replace("/media/traders/traders/", "/traders/")
        .replace("/media/traders/", "/traders/");

      return `${import.meta.env.VITE_AZURE_STORAGE_URL}${cleanPath}`;
    }

    // If it's just a filename, construct the full path
    return `${import.meta.env.VITE_AZURE_STORAGE_URL}/traders/${photoPath}`;
  };

  // Get the custom title based on currentService, fallback to currentService if no custom title exists
  const getServiceTitle = (service) => {
    return serviceDisplayTitles[service] || `${service} Services`;
  };

  const handleTraderClick = (trader) => {
    onTraderSelect(trader);
    navigate(`/${trader.id}`);
  };

  return (
    <div className="container justify-center px-12 py-8 mx-auto max-w-19/20 min-[1339px]:max-w-11/12 min-[1920px]:max-w-5/6">
      <div className="px-2 text-[27px] min-[1339px]:text-3xl font-semibold text-gray-900 mb-7 min-[1339px]:mb-9 min-[1920px]:mb-8">
        {getServiceTitle(currentService)}
      </div>

      {traders.length === 0 ? (
        showNoTraders ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center pb-35">
            <div className="mb-5 text-2xl font-semibold text-gray-700">
              No providers available yet
            </div>
            <div className="text-lg text-gray-600">
              We are working hard on finding providers within this location.
            </div>
            <div className="mt-2 text-gray-500">
              Please find provider in a different location or check back later.
            </div>
          </div>
        ) : showLoading ? (
          <div className="container min-h-screen pt-20 pb-20 mx-auto">
            <Stage3LoadingDesktop />
          </div>
        ) : (
          // Show nothing for the first 5 seconds
          <div className="container min-h-screen pt-20 pb-20 mx-auto"></div>
        )
      ) : (
        <div className="grid justify-center grid-cols-4 gap-5">
          {traders.map((trader) => (
            <div
              key={trader.id}
              className="flex flex-col w-full pb-10 overflow-hidden transition-shadow bg-white cursor-pointer rounded-2xl hover:shadow-lg"
              onClick={() => handleTraderClick(trader)}
            >
              {/* Image Container with Gradient Overlay and Name */}
              <div className="relative w-full overflow-hidden aspect-square">
                <ImageWithFallback
                  src={getImageUrl(trader.main_photo)}
                  alt={trader.name}
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-2xl hover:scale-102"
                />

                {/* Name Overlay */}
                <div className="absolute left-0 min-[1920px]:-left-0.5 top-2.5 min-[1920px]:top-3.5 z-10">
                  <span className="px-6 min-[1920px]:px-6.5 py-3 min-[1920px]:py-3.5 font-semibold text-white bg-black rounded-xl text-[15px] min-[1256px]:text-base min-[1920px]:text-[17px]">
                    {trader.name}
                  </span>
                </div>
              </div>

              {/* Trader Information */}
              <div className="flex flex-col flex-grow px-2.5 min-[1920px]:px-3.5 pt-4">
                {/* Title */}
                <link
                  href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
                  rel="stylesheet"
                />

                <p className="mb-2 min-[1920px]:mb-4.5 text-lg font-semibold text-gray-700">
                  {trader.title}
                </p>

                {/* Push the location and price to the bottom */}
                <div className="flex items-end justify-between mt-auto">
                  {/* Available Locations */}
                  <div className="flex-1 mr-4">
                    <p className="text-sm min-[1920px]:text-base text-gray-800 line-clamp-2">
                      {trader.available_locations.join(", ")}
                    </p>
                  </div>
                  {/* Price */}
                  <p className="text-sm min-[1920px]:text-base text-gray-800 underline whitespace-nowrap">
                    From £{trader.from_price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Traders_Collections.propTypes = {
  traders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      from_price: PropTypes.number.isRequired,
      main_photo: PropTypes.string,
      available_locations: PropTypes.arrayOf(PropTypes.string).isRequired,
      service_type: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentService: PropTypes.string.isRequired,
  onTraderSelect: PropTypes.func.isRequired,
};

Traders_Collections.defaultProps = {
  currentService: "Removal",
};
