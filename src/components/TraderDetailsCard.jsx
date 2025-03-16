import React from "react";
import PropTypes from "prop-types";

export default function TraderDetailsCard({ trader }) {
  return (
    <div className="col-span-3 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="relative h-96">
        <img
          src={`${import.meta.env.VITE_API_URL}${trader.main_photo}`}
          alt={trader.name}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>

      {/* Content Section */}
      <div className="p-8">
        <h1 className="mb-2 text-3xl font-bold">{trader.name}</h1>
        <h2 className="mb-4 text-xl text-gray-600">{trader.title}</h2>

        {/* Service Type */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Service Type</h3>
          <p>{trader.removal_type}</p>
        </div>

        {/* Service Descriptions */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Service Description</h3>
          <p>{trader.service_descriptions}</p>
        </div>

        {/* Qualifications */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Qualifications</h3>
          <p>{trader.qualifications}</p>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Pricing</h3>
          {/* <li>Starting from: £{trader.from_price}</li> */}
          <div className="whitespace-pre-line">
            {trader.pricing_descriptions}
          </div>
        </div>

        {/* Available Locations */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Available Locations</h3>
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
  }).isRequired,
};
