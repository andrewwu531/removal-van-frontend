import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function TraderDetailsCard({ trader, isLoading }) {
  const [showNoTrader, setShowNoTrader] = useState(false);

  useEffect(() => {
    // Reset the state whenever trader or loading state changes
    setShowNoTrader(false);

    let timer;
    if (!trader && !isLoading) {
      // Only start timer if we're not loading and have no trader
      timer = setTimeout(() => {
        setShowNoTrader(true);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [trader, isLoading]);

  // Show loading spinner while loading or during initial 5-second delay
  if (isLoading || (!trader && !showNoTrader)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen col-span-3 py-20 pb-16 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Loading trader details...</p>
      </div>
    );
  }

  // Show no trader message after 5 seconds if trader is not found
  if (!trader && showNoTrader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen col-span-3 py-20 pb-16 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800">
          Trader Not Found
        </h1>
        <p className="mt-2 text-gray-600">
          The trader you're looking for could not be found.
        </p>
        <a
          href="/"
          className="px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
        >
          Return to Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen col-span-3 pb-16 bg-white rounded-lg shadow-lg">
      {/* Header Section */}

      {/* Content Section */}
      <div className="px-16 pt-13">
        <h1 className="mb-2 text-3xl font-bold">{trader.name}</h1>
        <h2 className="text-xl text-gray-600 ">{trader.title}</h2>

        {/* Service Type */}
        <div className="mt-12">
          <h3 className="mb-1 text-lg font-semibold ">Service Type</h3>
          <p>{trader.removal_type}</p>
        </div>

        {/* Service Descriptions */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Service Description</h3>
          <p>{trader.service_descriptions}</p>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Qualifications</h3>
          <p>{trader.qualifications}</p>
        </div>

        {/* Pricing */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Pricing</h3>
          {/* <li>Starting from: £{trader.from_price}</li> */}
          <div className="whitespace-pre-line">
            {trader.pricing_descriptions}
          </div>
        </div>

        {/* Available Locations */}
        <div>
          <h3 className="mt-10 mb-1.5 text-lg font-semibold">
            Available Locations
          </h3>
          <p>{trader.available_locations.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

TraderDetailsCard.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    main_photo: PropTypes.string.isRequired,
    removal_type: PropTypes.string.isRequired,
    from_price: PropTypes.number.isRequired,
    pricing_descriptions: PropTypes.string,
    qualifications: PropTypes.string.isRequired,
    service_descriptions: PropTypes.string.isRequired,
    available_locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }), // Made optional since we now handle null/undefined cases
  isLoading: PropTypes.bool,
};

TraderDetailsCard.defaultProps = {
  isLoading: false,
};
