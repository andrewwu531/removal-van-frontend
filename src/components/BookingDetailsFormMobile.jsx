// src/components/BookingDetailsForm.jsx
import React from "react";
import PropTypes from "prop-types";

const BookingDetailsForm = ({ formData, handleChange, handleQuote }) => {
  return (
    <form onSubmit={handleQuote}>
      <div className="space-y-2 text-gray-700">
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Telephone</label>
          <input
            type="text"
            name="Telephone"
            value={formData.Telephone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Available Date
          </label>
          <input
            type="date"
            name="AvailableDate"
            value={formData.AvailableDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div className="space-y-2 text-gray-700">
        <div>
          <label className="block mt-1 mb-1 text-sm font-medium">
            Removal Address
          </label>
          <input
            type="text"
            name="RemovalAddress"
            value={formData.RemovalAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Delivery Address
          </label>
          <input
            type="text"
            name="DeliveryAddress"
            value={formData.DeliveryAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Removal Type</label>
          <select
            name="RemovalType"
            value={formData.RemovalType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Home">Home</option>
            <option value="Business">Business</option>
          </select>
        </div>
        {formData.RemovalType === "Home" && (
          <div>
            <label className="block mb-1 text-sm font-medium">
              Number of Bedrooms
            </label>
            <input
              type="number"
              name="Bedrooms"
              value={formData.Bedrooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        )}
        {formData.RemovalType === "Business" && (
          <div>
            <label className="block mb-1 text-sm font-medium">
              Number of Large Appliances
            </label>
            <input
              type="number"
              name="Appliances"
              value={formData.Appliances}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        )}
      </div>
      <div className="col-span-2 text-gray-700">
        <label className="block mt-2 mb-1 text-sm font-medium">
          Additional Information, e.g. alternative available dates
        </label>
        <textarea
          name="AdditionalInformation"
          value={formData.AdditionalInformation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          rows="3"
        ></textarea>
      </div>
      <div className="flex justify-center col-span-2 mt-10">
        <button
          type="submit"
          className="py-2.5 text-white font-medium text-md transition duration-300 bg-green-400 rounded-md px-7 hover:scale-103"
        >
          View Price
        </button>
      </div>
    </form>
  );
};

BookingDetailsForm.propTypes = {
  formData: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
    RemovalAddress: PropTypes.string.isRequired,
    DeliveryAddress: PropTypes.string.isRequired,
    RemovalType: PropTypes.string.isRequired,
    Bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Appliances: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    AvailableDate: PropTypes.string.isRequired,
    AdditionalInformation: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleQuote: PropTypes.func.isRequired,
};

export default BookingDetailsForm;
