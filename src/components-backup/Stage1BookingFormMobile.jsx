import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

const Stage1BookingFormMobile = ({ bookingDetails, onNextStep }) => {
  const [formData, setFormData] = useState(bookingDetails);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep(formData);
  };

  return (
    <div className="w-5/6 font-sans">
      <div className="bg-white rounded-lg ">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-6 text-xl font-semibold text-gray-700 ">
            Personal Details
          </h2>

          <div className="grid grid-cols-1">
            <div className="mb-3">
              <label className="block font-semibold text-gray-700 text-md ">
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
              <label className="block font-semibold text-gray-700">
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
            <label className="block font-semibold text-gray-700">
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
          <h2 className="mt-10 mb-6 text-xl font-semibold text-gray-700">
            Removal Information
          </h2>
          <div className="mb-3">
            <label className="block font-semibold text-gray-700">
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
            <label className="block font-semibold text-gray-700">
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
            <label className="block font-semibold text-gray-700">
              Deposit Amount
            </label>
            <div className="relative">
              <select
                name="DepositAmount"
                value={formData.DepositAmount}
                onChange={handleChange}
                className="w-full p-3 mt-1 mb-4 border border-gray-300 rounded appearance-none focus:outline-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23333' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.65rem center",
                  backgroundSize: "0.65rem auto",
                }}
              >
                <option>£60</option>
                <option>£100</option>
              </select>
            </div>
          </div>
          <div className="text-left mt-14">
            <button
              type="submit"
              className="flex justify-center mx-auto px-11 py-4.5  mt-5 font-semibold text-lg  text-white bg-indigo-600 rounded-lg  focus:outline-none hover:scale-105"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Stage1BookingFormMobile.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  onNextStep: PropTypes.func.isRequired,
};

export default Stage1BookingFormMobile;
