import React from "react";
import PropTypes from "prop-types";

export default function Traders_Collections({ traders }) {
  // Function to get the complete image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;
    // Remove any leading slash from photoPath to avoid double slashes

    return `${import.meta.env.VITE_API_URL}${photoPath}`;
  };

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <div className="px-2 mb-8 text-3xl font-semibold text-gray-900">
        Removal Services
      </div>
      <div className="grid justify-center grid-cols-3 gap-6">
        {traders.map((trader) => (
          <div
            key={trader.id}
            className="w-full overflow-hidden transition-shadow duration-300 bg-white rounded-xl"
          >
            {/* Image Container with Gradient Overlay and Name */}
            <div className="relative w-full overflow-hidden h-80">
              {trader.main_photo ? (
                <>
                  <img
                    src={getImageUrl(trader.main_photo)}
                    alt={trader.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[20%] rounded-lg"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  {/* Name Overlay */}
                  <div className="absolute left-0 top-2">
                    <span className="px-6 py-3 font-semibold text-white bg-black rounded-md text-md">
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
            <div className="p-4">
              {/* Title */}
              <p className="mb-8 font-semibold text-gray-900 text-md">
                {trader.title}
              </p>

              <div className="flex flex-row justify-between">
                {/* Available Locations */}
                <div className="flex flex-row text-sm">
                  <p className="mb-4 text-gray-800">Locations:</p>
                  <p className="text-gray-800 line-clamp-2">
                    &nbsp;{trader.available_locations.join(", ")}
                  </p>
                </div>
                {/* Price */}
                <p className="mb-2 text-sm text-gray-800">
                  From £{trader.from_price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
};
