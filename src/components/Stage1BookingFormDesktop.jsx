import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

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
    <div
      className="w-5/6 min-[1423px]:w-4/5 min-[3840px]:w-5/6 font-sans"
      id="booking-form"
    >
      <div className="pt-2 min-[2560px]:pt-6 mr-4 bg-white rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-6 min-[1423px]:mb-9 min-[1920px]:mb-10 text-2xl min-[2560px]:text-3xl font-semibold text-gray-700 ">
            Personal Details
          </h2>

          <div className="grid grid-cols-2 gap-4 min-[3840px]:gap-10">
            <div className="mb-3">
              <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
                Name
              </label>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
                Email Address
              </label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-3 min-[2560px]:mt-1">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Telephone
            </label>
            <input
              type="tel"
              name="Telephone"
              value={formData.Telephone}
              onChange={handleChange}
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <h2 className="mt-10 mb-5 min-[1920px]:mb-10 text-2xl min-[2560px]:text-3xl font-semibold text-gray-700">
            Removal Information
          </h2>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Pickup Location
            </label>
            <input
              type="text"
              name="PickupLocation"
              value={formData.PickupLocation}
              onChange={handleChange}
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="mb-3 min-[2560px]:mt-1">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Dropoff Location
            </label>
            <input
              type="text"
              name="DropoffLocation"
              value={formData.DropoffLocation}
              onChange={handleChange}
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Deposit Amount
            </label>
            <div className="relative min-[2560px]:text-lg">
              <select
                name="DepositAmount"
                value={formData.DepositAmount}
                onChange={handleChange}
                className="block p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded w-35 min-[2560px]:w-40 focus:outline-none"
              >
                <option>£60</option>
                <option>£100</option>
              </select>
            </div>
          </div>
          <div className="mt-10 text-left">
            <button
              type="submit"
              className="px-11 min-[2560px]:px-14 py-4.5 min-[2560px]:py-6 mt-5 font-semibold text-lg min-[2560px]:text-xl text-white bg-indigo-600 rounded-lg  focus:outline-none hover:scale-105"
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
