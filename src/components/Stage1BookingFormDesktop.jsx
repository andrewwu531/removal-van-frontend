import React, { useState } from "react";
import PropTypes from "prop-types";

const Stage1BookingFormDesktop = ({ bookingDetails, onNextStep }) => {
  const [formData, setFormData] = useState(bookingDetails);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep(formData);
  };

  return (
    <div className="font-sans" id="booking-form">
      <div className="px-12 pt-10 bg-white rounded-lg ">
        <form onSubmit={handleSubmit}>
          <h2 className="mt-3 mb-6 text-2xl font-semibold text-gray-700">
            Personal Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block font-medium text-gray-700 text-md">
                Name
              </label>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 text-md">
                Email Address
              </label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md">
              Telephone
            </label>
            <input
              type="tel"
              name="Telephone"
              value={formData.Telephone}
              onChange={handleChange}
              className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <h2 className="mt-10 mb-5 text-2xl font-semibold text-gray-700">
            Removal Information
          </h2>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md">
              Pickup Location
            </label>
            <input
              type="text"
              name="PickupLocation"
              value={formData.PickupLocation}
              onChange={handleChange}
              className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md">
              Dropoff Location
            </label>
            <input
              type="text"
              name="DropoffLocation"
              value={formData.DropoffLocation}
              onChange={handleChange}
              className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md">
              Deposit Amount
            </label>
            <div className="relative">
              <select
                name="DepositAmount"
                value={formData.DepositAmount}
                onChange={handleChange}
                className="block p-3 mt-1 bg-white border border-gray-300 rounded w-35 focus:outline-none"
              >
                <option>£60</option>
                <option>£100</option>
              </select>
            </div>
          </div>
          <div className="mt-10 text-left">
            <button
              type="submit"
              className="px-11 py-4.5 mt-5 font-semibold text-xl text-white bg-amber-500 rounded-lg  focus:outline-none hover:scale-105"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Stage1BookingFormDesktop.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  onNextStep: PropTypes.func.isRequired,
};

export default Stage1BookingFormDesktop;
