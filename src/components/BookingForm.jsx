// src/components/BookingForm.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    removalAddress: "",
    deliveryAddress: "",
    removalType: "Home",
    bedrooms: "",
    appliances: "",
    date: "",
    additionalInformation: "",
  });
  const [quote, setQuote] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuote = (e) => {
    e.preventDefault();
    let basePrice = 100; // Base price in GBP
    let businessPrice = 75;

    if (formData.removalType === "Home") {
      const bedrooms = parseInt(formData.bedrooms) || 0;
      basePrice += bedrooms * 85; // £50 per bedroom
    } else if (formData.removalType === "Business") {
      const appliances = parseInt(formData.appliances) || 0;
      basePrice += businessPrice + appliances * 25; // £75 per appliance
    }
    setQuote(basePrice);
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/create-checkout-session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: quote,
        formData: formData,
      }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }

    setPaymentCompleted(true);
  };

  return (
    <section id="booking">
      <div className="container px-4 pt-20 mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center text-gray-950">
          Book Your Removal Appointment
        </h2>
        {/* If no quote is generated, show the form */}
        {!quote ? (
          <form
            onSubmit={handleQuote}
            className="max-w-2xl p-8 mx-auto bg-white rounded shadow"
          >
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {/* Telephone Number */}
            <div className="mb-4">
              <label className="block text-gray-700">Telephone Number</label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {/* Removal Address */}
            <div className="mb-4">
              <label className="block text-gray-700">Removal Address</label>
              <input
                type="text"
                name="removalAddress"
                value={formData.removalAddress}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {/* Delivery Address */}
            <div className="mb-4">
              <label className="block text-gray-700">Delivery Address</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {/* Type of Removal */}
            <div className="mb-4">
              <label className="block text-gray-700">Type of Removal</label>
              <select
                name="removalType"
                value={formData.removalType}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              >
                <option value="Home">Home</option>
                <option value="Business">Business</option>
              </select>
            </div>
            {/* Conditional Fields */}
            {formData.removalType === "Home" && (
              <div className="mb-4">
                <label className="block text-gray-700">
                  Number of Bedrooms for Removal
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                  placeholder="Excluding Sitting Room, Kitchen and Bathroom"
                  required
                />
              </div>
            )}
            {formData.removalType === "Business" && (
              <div className="mb-4">
                <label className="block text-gray-700">
                  Number of Medium &amp; Large Appliances for Removal
                </label>
                <input
                  type="number"
                  name="appliances"
                  value={formData.appliances}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter number of appliances"
                  required
                />
              </div>
            )}
            {/* Available Date */}
            <div className="mb-4">
              <label className="block text-gray-700">Available Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {/* Additional Information */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Additional Information
              </label>
              <textarea
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                rows="3"
                placeholder="e.g. alternative available dates and special requirements"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600"
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
                <strong>Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Telephone:</strong> {formData.telephone}
              </p>
              <p>
                <strong>Removal Address:</strong> {formData.removalAddress}
              </p>
              <p>
                <strong>Delivery Address:</strong> {formData.deliveryAddress}
              </p>
              <p>
                <strong>Removal Type:</strong> {formData.removalType}
              </p>
              {formData.removalType === "Home" && (
                <p>
                  <strong>Bedrooms:</strong> {formData.bedrooms}
                </p>
              )}
              {formData.removalType === "Business" && (
                <p>
                  <strong>Appliances:</strong> {formData.appliances}
                </p>
              )}
              <p>
                <strong>Available Date:</strong> {formData.date}
              </p>
              {formData.additionalInformation && (
                <p>
                  <strong>Additional Information:</strong>{" "}
                  {formData.additionalInformation}
                </p>
              )}
            </div>
            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                className="px-6 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
              >
                Pay with Stripe
              </button>
            ) : (
              <p className="font-bold text-green-700">
                Payment Successful! A confirmation email has been sent.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
