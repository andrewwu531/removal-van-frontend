import React from "react";
import {
  FaPhone,
  FaQuoteLeft,
  FaTruck,
  FaCreditCard,
  FaEnvelopeOpen,
} from "react-icons/fa";

const BookingStepsDesktop = () => {
  // Define the five steps for the removal service booking process
  const steps = [
    {
      number: 1,
      title: "Contact Us",
      description:
        "Call or text us at 07943059792 and provide removal details: Name, Pickup & Drop-Off Location, Available Removal Dates, and Removal Descriptions.",
      icon: <FaPhone className="w-8 h-8 text-teal-600" />,
    },
    {
      number: 2,
      title: "Receive a Quote",
      description:
        "We will respond with a personalized quote based on your details.",
      icon: <FaQuoteLeft className="w-8 h-8 text-teal-600" />,
    },
    {
      number: 3,
      title: "Secure Your Booking with a Deposit",
      description:
        "Secure your booking online via our website and pay a PalPay deposit payment. The deposit is £60 for one bedroom, £100 for two bedrooms, or more for business removals.",
      icon: <FaCreditCard className="w-8 h-8 text-teal-600" />,
    },

    {
      number: 4,
      title: "Confirmation",
      description:
        "Receive an email confirmation and a follow-up text with your removal information.",
      icon: <FaEnvelopeOpen className="w-8 h-8 text-teal-600" />,
    },
    {
      number: 5,
      title: "Final Payment & Service Delivery",
      description:
        "Pay the remaining removal payment to our team and we will deliver the removal service for you.",
      icon: <FaTruck className="w-8 h-8 text-teal-600" />, // Using a truck icon to represent service delivery
    },
  ];

  return (
    <div className="pt-8 bg-white">
      <div className="max-w-screen-xl px-4 mx-auto">
        {/* <h2 className="mb-10 text-3xl font-bold text-center">
          How to Book a Removal Service
        </h2> */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              {/* Circle diagram with a border */}
              <div className="flex items-center justify-center w-16 h-16 mb-4 border-4 border-teal-500 rounded-full">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingStepsDesktop;
