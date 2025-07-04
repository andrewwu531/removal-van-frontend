import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EnquiryController from "./enquiry/EnquiryController";
import BookingStageController from "./booking/BookingStageController";
import PhoneMessagingButton from "../common/PhoneMessagingButton";

const ServiceFormSelector = ({ currentService = "Removal" }) => {
  const [activeCard, setActiveCard] = useState(null); // "enquiry" or "booking"
  const [showContent, setShowContent] = useState(false);

  // 100ms timeout for sections below TradersCollection
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // If content is not shown yet, render nothing
  if (!showContent) {
    return null;
  }

  return (
    <div className="p-6 mx-auto mb-20 w-full">
      {/* Header */}
      <div className="mx-6 mt-12 mb-12 text-center md:mx-0">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          How can we help today?
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Message or call us directly today on{" "}
          <PhoneMessagingButton
            serviceType={currentService}
            className="inline-block mx-2"
          >
            07943 059 792
          </PhoneMessagingButton>{" "}
          to find out more about our services in details and secure a preferred
          date. Alternatively, you can:
        </p>
      </div>

      {/* Option Cards Container */}
      <div className="flex flex-col gap-8 justify-center items-stretch mx-auto w-full max-w-6xl transition-all duration-500 md:flex-row">
        {/* Enquiry Option */}
        <div
          className={`
            transition-all duration-500 ease-in-out
            ${
              activeCard === "enquiry"
                ? "w-full"
                : activeCard === "booking"
                  ? "hidden md:block md:w-0 md:opacity-0 md:overflow-hidden"
                  : "w-full md:w-1/2"
            }
          `}
        >
          <div className="flex flex-col p-10 h-full bg-white rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300">
            {activeCard === "enquiry" ? (
              <>
                <div className="mb-6 text-right">
                  <button
                    onClick={() => setActiveCard(null)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    &larr; Back to Options
                  </button>
                </div>
                <EnquiryController
                  currentService={currentService}
                  onBack={() => setActiveCard(null)}
                />
              </>
            ) : (
              <div className="flex flex-col h-full text-center">
                <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 bg-blue-200 rounded-full">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                  Make an Enquiry
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Get detailed information about our services, pricing, and
                  availability. Perfect if you're still exploring options or
                  need a quote.
                </p>
                <ul className="mb-6 space-y-2 text-sm text-left text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Service-specific questions
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Detailed pricing information
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Availability check
                  </li>
                </ul>
                <button
                  className="px-6 py-3 mt-auto w-full font-semibold text-white bg-blue-600 rounded-lg transition-colors duration-300 hover:bg-blue-600"
                  onClick={() => setActiveCard("enquiry")}
                >
                  Start Enquiry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Booking Option */}
        <div
          className={`
            transition-all duration-500 ease-in-out
            ${
              activeCard === "booking"
                ? "w-full"
                : activeCard === "enquiry"
                  ? "hidden md:block md:w-0 md:opacity-0 md:overflow-hidden"
                  : "w-full md:w-1/2"
            }
          `}
        >
          <div className="flex flex-col p-10 h-full bg-white rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300">
            {activeCard === "booking" ? (
              <>
                <div className="mb-6 text-right">
                  <button
                    onClick={() => setActiveCard(null)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    &larr; Back to Options
                  </button>
                </div>
                <BookingStageController
                  trader={null}
                  onBack={() => setActiveCard(null)}
                />
              </>
            ) : (
              <div className="flex flex-col h-full text-center">
                <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 bg-red-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                  Book Appointment
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Ready to proceed? Pay a deposit and secure your booking. Ideal
                  if you have already spoken to us and want to go ahead with an
                  appointment.
                </p>
                <ul className="mb-6 space-y-2 text-sm text-left text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Direct appointment booking
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure your preferred date
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Deposit payment
                  </li>
                </ul>
                <button
                  className="px-6 py-3 mt-auto w-full font-semibold text-white bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600"
                  onClick={() => setActiveCard("booking")}
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceFormSelector.propTypes = {
  currentService: PropTypes.string,
};

export default ServiceFormSelector;
