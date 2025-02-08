// src/components/BookingForm.jsx
import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    removalType: "Home",
    bedrooms: "",
    appliances: "",
    date: "",
    specialRequirements: "",
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
    if (formData.removalType === "Home") {
      const bedrooms = parseInt(formData.bedrooms) || 0;
      basePrice += bedrooms * 50; // £50 per bedroom
    } else if (formData.removalType === "Business") {
      const appliances = parseInt(formData.appliances) || 0;
      basePrice += appliances * 75; // £75 per appliance
    }
    setQuote(basePrice);
  };

  const handlePayment = () => {
    // Replace with actual Stripe integration and email notification
    setPaymentCompleted(true);
  };

  return (
    <section id="booking" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Book Your Removal Appointment
        </h2>
        <form
          onSubmit={handleQuote}
          className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type of Removal</label>
            <select
              name="removalType"
              value={formData.removalType}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="Home">Home</option>
              <option value="Business">Business</option>
            </select>
          </div>
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter number of appliances"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Available Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Special Requirements</label>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              rows="3"
              placeholder="Any special requirements or details"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Generate Quote
            </button>
          </div>
        </form>
        {quote && (
          <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow text-center">
            <h3 className="text-2xl font-bold mb-4">
              Your Quoted Price: £{quote}
            </h3>
            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
              >
                Pay with Stripe
              </button>
            ) : (
              <p className="text-green-700 font-bold">
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
