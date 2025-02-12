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

  // (Optional) Handle final booking when the "Book Appointment" button is clicked.
  const handleBookAppointment = () => {
    // Add your booking/payment logic here (e.g., using Stripe)
    console.log(
      "Booking appointment with data:",
      formData,
      "and quote:",
      quote
    );
  };

  return (
    <section
      id="booking"
      className="flex items-center justify-center min-h-screen py-16 bg-gray-50"
    >
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        {/* Conditionally show the header or the "Book Appointment" button */}
        {!quote ? (
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
            Book Removal Appointment
          </h2>
        ) : (
          <div></div>
        )}

        {/* Render form or confirmation details based on the state of 'quote' */}
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
                  Number of Bedrooms for Removal
                </label>
                <input
                  type="number"
                  name="Bedrooms"
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
                  Number of Medium &amp; Large Appliances
                </label>
                <input
                  type="number"
                  name="Appliances"
                  value={formData.Appliances}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            <div className="relative mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Additional Information, e.g. alternative available dates
              </label>
              <textarea
                name="AdditionalInformation"
                value={formData.AdditionalInformation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                rows="3"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 px-4 py-2 text-white transition-transform duration-200 bg-green-500 rounded-md hover:scale-105"
              >
                View Price
              </button>
            </div>
          </form>
        ) : (
          // Optionally display confirmation details after quote is generated.
          <div className="max-w-2xl p-6 mx-auto mt-8 bg-white rounded ">
            <h3 className="mb-10 text-2xl font-bold">
              Your Quoted Price is £{quote}!
            </h3>
            <div className="mb-10">
              <ul>
                {(() => {
                  // Build an array of detail objects from formData
                  const details = [
                    { label: "Name", value: formData.FullName },
                    { label: "Email", value: formData.Email },
                    { label: "Telephone", value: formData.Telephone },
                    {
                      label: "Removal Address",
                      value: formData.RemovalAddress,
                    },
                    {
                      label: "Delivery Address",
                      value: formData.DeliveryAddress,
                    },
                    { label: "Removal Type", value: formData.RemovalType },
                  ];

                  // Include conditional fields based on RemovalType
                  if (formData.RemovalType === "Home") {
                    details.push({
                      label: "Number of Bedrooms for Removal",
                      value: formData.Bedrooms,
                    });
                  } else if (formData.RemovalType === "Business") {
                    details.push({
                      label: "Appliances",
                      value: formData.Appliances,
                    });
                  }

                  // Add the remaining details
                  details.push({
                    label: "Available Date",
                    value: formData.AvailableDate,
                  });
                  if (formData.AdditionalInformation) {
                    details.push({
                      label: "Additional Information",
                      value: formData.AdditionalInformation,
                    });
                  }

                  // Map over the details array to render each row
                  return details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-1 font-bold text-gray-700 text-md">
                        {detail.label}:
                      </span>
                      <span className="text-base text-gray-600">
                        {detail.value}
                      </span>
                    </li>
                  ));
                })()}
              </ul>
            </div>
          </div>
        )}
        {!quote ? (
          <div></div>
        ) : (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleBookAppointment}
              className="py-3 font-medium text-white transition-transform duration-200 bg-green-500 rounded-md px-9 hover:scale-103"
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
