// src/components/BookingForm.jsx
import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
} from "@paypal/react-paypal-js";
import BookingDetailsForm from "./BookingDetailsForm";
import QuoteSummary from "./QuoteSummary";
import PaymentForm from "./PaymentForm";
import uk_map from "../assets/UK-map.png";

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
  const [isPaying, setIsPaying] = useState(false);

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
        {/* Right Side - Content */}
        <div className="flex w-[55%] items-center justify-center p-10">
          <div className="w-full max-w-lg p-6 rounded-lg">
            <h2 className="mb-10 text-2xl font-bold text-center text-gray-700">
              {isPaying
                ? "Complete Payment"
                : isViewingQuote
                  ? "Quote Summary"
                  : "Book Removal Appointment"}
            </h2>

            {/* Phase 1: Booking Details Form */}
            {!isViewingQuote && !isPaying && (
              <BookingDetailsForm
                formData={formData}
                handleChange={handleChange}
                handleQuote={handleQuote}
              />
            )}

            {/* Phase 2: Quote Summary */}
            {isViewingQuote && !isPaying && (
              <QuoteSummary
                quote={quote}
                onProceedToPayment={() => setIsPaying(true)}
                onEditDetails={() => setIsViewingQuote(false)}
              />
            )}

            {/* Phase 3: Payment */}
            {isPaying && <PaymentForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
