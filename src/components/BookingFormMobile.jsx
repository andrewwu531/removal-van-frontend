// src/components/BookingForm.jsx
import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
} from "@paypal/react-paypal-js";
import BookingDetailsFormMobile from "./BookingDetailsFormMobile";
import QuoteSummaryMobile from "./QuoteSummaryMobile";
import PaymentForm from "./PaymentForm";
import uk_map from "../assets/UK-map.png";

const BookingFormMobile = () => {
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
      className="flex items-center justify-center min-h-screen"
    >
      <div className="flex w-full max-w-6xl overflow-hidden shadow-lg bg-blue-50 rounded-2xl">
        {/* Right Side - Content */}
        <div className="flex items-center justify-center [@media(max-width:330px)]:px-5 px-8 [@media(min-width:400px)]:px-10 py-16">
          <div className="w-full max-w-lg p-6 rounded-lg">
            <h2
              className={`mb-10 text-2xl font-bold text-center text-gray-700 ${
                isViewingQuote ? "underline" : ""
              }`}
            >
              {isPaying
                ? ""
                : isViewingQuote
                  ? "Quote Summary"
                  : "Book Removal Appointment"}
            </h2>

            {/* Phase 1: Booking Details Form */}
            {!isViewingQuote && !isPaying && (
              <BookingDetailsFormMobile
                formData={formData}
                handleChange={handleChange}
                handleQuote={handleQuote}
              />
            )}

            {/* Phase 2: Quote Summary */}
            {isViewingQuote && !isPaying && (
              <QuoteSummaryMobile
                quote={quote}
                onProceedToPayment={() => setIsPaying(true)}
                onEditDetails={() => setIsViewingQuote(false)}
              />
            )}

            {/* Phase 3: Payment */}
            {/* {isPaying && <PaymentForm />} */}
            {isPaying && <PaymentForm bookingDetails={formData} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingFormMobile;
