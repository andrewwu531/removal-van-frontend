import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

const BookingForm = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Telephone: "",
    RemovalAddress: "",
    DeliveryAddress: "",
    RemovalType: "Home",
    Bedrooms: "",
    Appliances: "",
    AvailableDate: "",
    AdditionalInformation: "",
  });
  const [quote, setQuote] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? parseInt(value) : "") : value,
    }));
  };

  const handleQuote = (e) => {
    e.preventDefault();
    let basePrice = 100;
    let businessPrice = 75;

    if (formData.RemovalType === "Home") {
      const bedrooms = parseInt(formData.Bedrooms) || 0;
      basePrice += bedrooms * 85;
    } else if (formData.RemovalType === "Business") {
      const appliances = parseInt(formData.Appliances) || 0;
      basePrice += businessPrice + appliances * 25;
    }
    setQuote(basePrice);
  };

  return (
    <section className="flex items-center justify-center min-h-screen py-16 bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
          Book Removal Appointment
        </h2>

        {!quote ? (
          <form onSubmit={handleQuote} className="space-y-8">
            {[
              "FullName",
              "Email",
              "Telephone",
              "RemovalAddress",
              "DeliveryAddress",
              "AvailableDate",
            ].map((field, index) => (
              <div key={index} className="relative mb-3">
                <label className="block px-0.5 mb-1 text-sm font-medium text-gray-700">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field === "AvailableDate" ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            ))}

            <div className="relative mb-3">
              <label className="block mb-1 px-0.5 text-sm font-medium text-gray-700">
                Type of Removal
              </label>
              <select
                name="RemovalType"
                value={formData.RemovalType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Home">Home</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {formData.RemovalType === "Home" && (
              <div className="relative mb-3">
                <label className="block mb-1 text-sm font-medium text-gray-700 px-0.5">
                  Number of Bedrooms
                </label>
                <input
                  type="number"
                  name="Bedrooms" // Fix: Make sure the name matches formData
                  value={formData.Bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            {formData.RemovalType === "Business" && (
              <div className="relative mb-3">
                <label className="block mb-1 px-0.5 text-sm font-medium text-gray-700">
                  Number of Appliances
                </label>
                <input
                  type="number"
                  name="Appliances" // Fix: Ensure correct name
                  value={formData.Appliances}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            <div className="relative mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <textarea
                name="AdditionalInformation" // Fix: Ensure correct name
                value={formData.AdditionalInformation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                rows="3"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-pink-600"
              >
                View Price
              </button>
            </div>
          </form>
        ) : (
          // Confirmation Detail Section (after form submission)
          <div className="max-w-2xl p-6 mx-auto mt-8 bg-white rounded shadow">
            <h3 className="mb-4 text-2xl font-bold">
              Your Quoted Price: £{quote}
            </h3>
            <div className="mb-8 text-left text-gray-700">
              <p>
                <strong>Name:</strong> {formData.FullName}
              </p>
              <p>
                <strong>Email:</strong> {formData.Email}
              </p>
              <p>
                <strong>Telephone:</strong> {formData.Telephone}
              </p>
              <p>
                <strong>Removal Address:</strong> {formData.RemovalAddress}
              </p>
              <p>
                <strong>Delivery Address:</strong> {formData.DeliveryAddress}
              </p>
              <p>
                <strong>Removal Type:</strong> {formData.RemovalType}
              </p>
              {formData.RemovalType === "Home" && (
                <p>
                  <strong>Bedrooms:</strong> {formData.Bedrooms}
                </p>
              )}
              {formData.RemovalType === "Business" && (
                <p>
                  <strong>Appliances:</strong> {formData.Appliances}
                </p>
              )}
              <p>
                <strong>Available Date:</strong> {formData.AvailableDate}
              </p>
              {formData.AdditionalInformation && (
                <p>
                  <strong>Additional Information:</strong>{" "}
                  {formData.AdditionalInformation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
