import React from "react";
import {
  FaPhone,
  FaQuoteLeft,
  FaTruck,
  FaCreditCard,
  FaEnvelopeOpen,
} from "react-icons/fa";

const BookingStepsMobile = () => {
  // Define the five steps for the removal service booking process
  const steps = [
    {
      number: 1,
      title: "Contact Us",
      description:
        "Call or text us at 07943059792 and provide removal details: Name, Pickup & Drop-Off Location, Available Removal Dates, and Removal Descriptions.",
      icon: (
        <FaPhone className="w-5 h-5  min-[3840px]:w-10 min-[3840px]:h-10 text-indigo-600" />
      ),
    },
    {
      number: 2,
      title: "Receive a Quote",
      description:
        "We will respond with a personalized quote based on your details.",
      icon: (
        <FaQuoteLeft className="w-5 h-5  min-[3840px]:w-10 min-[3840px]:h-10 text-indigo-600" />
      ),
    },
    {
      number: 3,
      title: "Secure Your Booking with a Deposit",
      description:
        "Secure your booking online via our website and pay a PalPay deposit payment. ",
      icon: (
        <FaCreditCard className="w-5 h-5 min-[3840px]:w-10 min-[3840px]:h-10 text-indigo-600" />
      ),
    },

    {
      number: 4,
      title: "Confirmation",
      description:
        "Receive an email confirmation and a follow-up text with your removal information.",
      icon: (
        <FaEnvelopeOpen className="w-5 h-5  min-[3840px]:w-10 min-[3840px]:h-10 text-indigo-600" />
      ),
    },
    {
      number: 5,
      title: "Final Payment & Service Delivery",
      description:
        "Pay the remaining removal payment to our team and we will deliver the removal service for you.",
      icon: (
        <FaTruck className="w-5 h-5 min-[3840px]:w-10 min-[3840px]:h-10 text-indigo-600" />
      ), // Using a truck icon to represent service delivery
    },
  ];

  return (
    <div
      id="booking-steps"
      className="flex flex-col justify-center w-11/12 pt-8 pb-12 mx-auto bg-indigo-100 rounded-xl"
    >
      <div className="flex justify-center w-3/4 pb-6 mx-auto text-2xl font-semibold text-center ">
        Five-Step Removal
      </div>

      {/* <div className="relative flex items-center justify-center w-11/12 mx-auto mb-6 text-white bg-indigo-600 rounded-lg py-7">
        <h1 className="text-xl font-semibold">Five-Step Removal</h1>
      </div> */}
      <div className="w-4/5 px-4 pt-3 mx-auto">
        <div className="grid grid-cols-1 gap-8 min-[1920px]:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              {/* Circle diagram with a border */}
              <div className="flex items-center justify-center w-14 h-14 min-[1920px]:w-15 min-[1920px]:h-15 min-[3840px]:h-30 min-[3840px]:w-30 mb-4 min-[1920px]:mb-5 min-[2560px]:mb-6 min-[3840px]:mb-9 border-4 min-[3840px]:border-7 border-indigo-600 rounded-full">
                {step.icon}
              </div>
              <h3 className="mb-2 min-[1920px]:mb-3 min-[2560px]:mb-4 min-[3840px]:mb-5 text-xl min-[1920px]:text-2xl min-[2560px]:text-3xl min-[3840px]:text-4xl font-semibold">
                {step.title}
              </h3>
              <p className="text-sm min-[1920px]:text-base min-[2560px]:text-xl min-[3840px]:text-2xl text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingStepsMobile;
