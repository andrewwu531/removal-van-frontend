import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

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

export default function Traders_Collections({ traders, currentService }) {
  const navigate = useNavigate();

  // Function to get the complete image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;
    // Remove any leading slash from photoPath to avoid double slashes

    return `${import.meta.env.VITE_API_URL}${photoPath}`;
  };

  // Get the custom title based on currentService, fallback to currentService if no custom title exists
  const getServiceTitle = (service) => {
    return serviceDisplayTitles[service] || `${service} Services`;
  };

  const handleTraderClick = (traderId) => {
    navigate(`/${traderId}`);
  };

  return (
    <div className="container justify-center px-12 py-8 mx-auto max-w-5/6">
      <div className="px-2 mb-8 text-3xl font-semibold text-gray-900">
        {getServiceTitle(currentService)}
      </div>

      {traders.length === 0 ? (
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
      ) : (
        <div className="grid justify-center grid-cols-4 gap-6">
          {traders.map((trader) => (
            <div
              key={trader.id}
              className="flex flex-col w-full pb-10 overflow-hidden transition-shadow bg-white cursor-pointer rounded-2xl hover:shadow-lg"
              onClick={() => handleTraderClick(trader.id)}
            >
              {/* Image Container with Gradient Overlay and Name */}
              <div className="relative w-full overflow-hidden aspect-square">
                {trader.main_photo ? (
                  <>
                    <img
                      src={getImageUrl(trader.main_photo)}
                      alt={trader.name}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-2xl hover:scale-102"
                    />

                    {/* Name Overlay */}
                    <div className="absolute left-0 top-2.5 z-10">
                      <span className="px-6 py-3 font-semibold text-white bg-black rounded-xl text-md">
                        {trader.name}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              {/* Trader Information */}
              <div className="flex flex-col flex-grow px-2.5 pt-4">
                {/* Title */}
                <link
                  href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
                  rel="stylesheet"
                />

                <p className="mb-2 text-lg font-semibold text-gray-700">
                  {trader.title}
                </p>

                {/* Push the location and price to the bottom */}
                <div className="flex items-end justify-between mt-auto">
                  {/* Available Locations */}
                  <div className="flex-1 mr-4">
                    <p className="text-sm text-gray-800 line-clamp-2">
                      {trader.available_locations.join(", ")}
                    </p>
                  </div>
                  {/* Price */}
                  <p className="text-sm text-gray-800 underline whitespace-nowrap">
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
    })
  ).isRequired,
  currentService: PropTypes.string.isRequired,
};

Traders_Collections.defaultProps = {
  currentService: "Removal",
};
