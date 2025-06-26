import React, { useState } from "react";
import PropTypes from "prop-types";
import EnquiryController from "./enquiry/EnquiryController";
import BookingStageController from "./booking/BookingStageController";

const ServiceFormSelector = ({ currentService = "Removal" }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOptionSelect = (option) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedOption(option);
      setIsTransitioning(false);
    }, 300); // Match the transition duration
  };

  const handleBackToSelection = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 300);
  };

  if (selectedOption) {
    return (
      <div
        className={`transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
      >
        {selectedOption === "enquiry" ? (
          <EnquiryController
            currentService={currentService}
            onBack={handleBackToSelection}
          />
        ) : (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleBackToSelection}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Options
              </button>
            </div>
            <BookingStageController trader={null} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
    >
      <div className="p-6 mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            How can we help you?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Choose whether you'd like to make an enquiry about our services or
            book an appointment directly.
          </p>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-4xl md:grid-cols-2">
          {/* Enquiry Option */}
          <div
            className="relative cursor-pointer group"
            onClick={() => handleOptionSelect("enquiry")}
          >
            <div className="p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:border-blue-500 group-hover:scale-105">
              <div className="text-center">
                <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full transition-colors duration-300 group-hover:bg-blue-200">
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
                <button className="px-6 py-3 w-full font-semibold text-white bg-blue-500 rounded-lg transition-colors duration-300 hover:bg-blue-600">
                  Start Enquiry
                </button>
              </div>
            </div>
          </div>

          {/* Booking Option */}
          <div
            className="relative cursor-pointer group"
            onClick={() => handleOptionSelect("booking")}
          >
            <div className="p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:border-red-500 group-hover:scale-105">
              <div className="text-center">
                <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 bg-red-100 rounded-full transition-colors duration-300 group-hover:bg-red-200">
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
                  Ready to proceed? Book your appointment directly and secure
                  your slot. Ideal if you know what you need and want to get
                  started.
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
                <button className="px-6 py-3 w-full font-semibold text-white bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600">
                  Book Now
                </button>
              </div>
            </div>
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
