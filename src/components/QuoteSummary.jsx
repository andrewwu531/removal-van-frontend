// src/components/QuoteSummary.jsx
import React from "react";
import PropTypes from "prop-types";

const QuoteSummary = ({ quote, onProceedToPayment, onEditDetails }) => {
  return (
    <div className="space-y-1 text-gray-700 ml-7">
      <p className="text-3xl font-medium text-center mb-15">
        <strong>Your Removal Price is £{quote}!</strong>
      </p>
      <div className="flex justify-center mt-12 space-x-4 font-medium text-md">
        <button
          className="px-8 py-2.5 text-white bg-green-400 rounded-md hover:scale-103"
          onClick={onProceedToPayment}
        >
          Proceed to Payment
        </button>
        <button
          className="px-6 py-2 text-white bg-gray-500 rounded-md hover:scale-103"
          onClick={onEditDetails}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

QuoteSummary.propTypes = {
  quote: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onProceedToPayment: PropTypes.func.isRequired,
  onEditDetails: PropTypes.func.isRequired,
};

export default QuoteSummary;
