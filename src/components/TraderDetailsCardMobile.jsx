import React from "react";
import PropTypes from "prop-types";

export default function TraderDetailsCard({ trader }) {
  return (
    <div className="col-span-3 pb-16 bg-white rounded-lg shadow-lg">
      {/* Header Section */}

      {/* Content Section */}
      <div className="pt-14 px-26">
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
  }).isRequired,
};
