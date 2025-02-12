import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import uk_map from "../assets/uk-map.png";

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
  const [isViewingQuote, setIsViewingQuote] = useState(false);

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
    const businessPrice = 75;

    if (formData.RemovalType === "Home") {
      const bedrooms = parseInt(formData.Bedrooms) || 0;
      basePrice += bedrooms * 85;
    } else if (formData.RemovalType === "Business") {
      const appliances = parseInt(formData.Appliances) || 0;
      basePrice += businessPrice + appliances * 25;
    }

    setQuote(basePrice);
    setIsViewingQuote(true);
  };

  return (
    <section
      id="booking"
      className="flex items-center justify-center min-h-screen my-12"
    >
      <div className="flex w-full h-[92vh] max-w-6xl overflow-hidden bg-white shadow-lg rounded-2xl">
        {/* Left Side - Image */}
        <div
          className="w-[45%] bg-center bg-cover"
          style={{ backgroundImage: `url(${uk_map})` }}
        ></div>

        {/* Right Side - Booking Form or Quote Summary */}
        <div className="flex w-[55%] items-center justify-center p-10">
          <div className="w-full max-w-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-7">
              {isViewingQuote ? "Quote Summary" : "Book Removal Appointment"}
            </h2>

            {isViewingQuote ? (
              // Quote Summary View
              <div className="space-y-4">
                <p>
                  <strong>Full Name:</strong> {formData.FullName}
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
                <p>
                  <strong>Additional Info:</strong>{" "}
                  {formData.AdditionalInformation || "N/A"}
                </p>
                <p className="text-xl font-bold">
                  <strong>Estimated Price: £{quote}</strong>
                </p>

                <div className="flex justify-center space-x-4">
                  <button
                    className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                    onClick={() => alert("Booking confirmed!")}
                  >
                    Book Appointment
                  </button>
                  <button
                    className="px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    onClick={() => setIsViewingQuote(false)}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              // Booking Form View
              <form
                onSubmit={handleQuote}
                className="grid grid-cols-2 gap-y-4 gap-x-5"
              >
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Full Name
                    </label>
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
                    <label className="block mb-1 text-sm font-medium">
                      Email
                    </label>
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
                    <label className="block mb-1 text-sm font-medium">
                      Telephone
                    </label>
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

                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
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
                    <label className="block mb-1 text-sm font-medium">
                      Removal Type
                    </label>
                    <select
                      name="RemovalType"
                      value={formData.RemovalType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md "
                    >
                      <option value="Home">Home</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  {formData.RemovalType === "Home" && (
                    <div className="relative">
                      <label className="block text-sm mb-1 font-medium px-0.5">
                        Number of Bedrooms
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
                    <div className="relative">
                      <label className="block px-0.5 mb-1 text-sm font-medium ">
                        Number of Appliances
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
                </div>
                <div className="relative col-span-2">
                  <label className="block mb-1 text-sm font-medium">
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

                <div className="flex justify-center col-span-2 mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    View Price
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
