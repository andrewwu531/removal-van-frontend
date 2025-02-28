// src/components/QuoteSummary.jsx
import React from "react";
import PropTypes from "prop-types";

const QuoteSummary = ({ quote, onProceedToPayment, onEditDetails }) => {
  return (
    <div className="text-gray-700 ">
      <p className="text-3xl font-medium text-center mt-14 mb-22">
        <strong>Your Removal Price is £{quote}!</strong>
      </p>
      <div className="flex flex-col justify-center mt-12 font-medium">
        <button
          className="mx-4 [@media(max-width:350px)]:mx-2 [@media(min-width:400px)]:mx-6 py-2.5 mb-1 text-black text-md bg-yellow-400 rounded-md hover:scale-103"
          onClick={onProceedToPayment}
        >
          Proceed to Payment
        </button>
        <button
          className="mx-4 py-2.5 text-black text-base underline rounded-md hover:scale-103"
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
