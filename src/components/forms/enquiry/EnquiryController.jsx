import React, { useState } from "react";
import PropTypes from "prop-types";
import EnquiryForm from "./EnquiryForm";

const EnquiryController = ({ currentService = "Removal", onBack }) => {
  const [stage, setStage] = useState(1);
  const [enquiryData, setEnquiryData] = useState(null);

  const handleEnquiryComplete = (data) => {
    setEnquiryData(data);
    setStage(2);
  };

  const handleBackToEnquiry = () => {
    setStage(1);
    setEnquiryData(null);
  };

  const handleBackToOptions = () => {
    if (onBack) {
      onBack();
    }
  };

  if (stage === 2) {
    return (
      <div className="p-6 mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="mx-auto w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Enquiry Sent Successfully!
          </h2>
          <p className="mb-6 text-gray-600">
            Thank you for your enquiry. We've received your request for{" "}
            <strong>{enquiryData?.serviceType}</strong> services and will get
            back to you within 24 hours.
          </p>
          <div className="p-4 mb-6 bg-gray-50 rounded-lg">
            <h3 className="mb-2 font-medium text-gray-800">Enquiry Summary:</h3>
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {enquiryData?.fullName}
              <br />
              <strong>Service:</strong> {enquiryData?.serviceType}
              <br />
              <strong>Preferred Date:</strong>{" "}
              {enquiryData?.preferredDate
                ? new Date(enquiryData.preferredDate).toLocaleDateString()
                : "Not specified"}
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleBackToEnquiry}
              className="px-8 py-3 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Send Another Enquiry
            </button>
            <button
              onClick={handleBackToOptions}
              className="px-8 py-3 font-medium text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none"
            >
              Back to Options
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EnquiryForm
        onComplete={handleEnquiryComplete}
        currentService={currentService}
      />
    </div>
  );
};

EnquiryController.propTypes = {
  currentService: PropTypes.string,
  onBack: PropTypes.func,
};

export default EnquiryController;
