import React from "react";
import PropTypes from "prop-types";

const Stage4ConfirmationDesktop = ({ bookingDetails, transactionDetails }) => (
  <div className="flex flex-col p-12 px-24 text-center w-2xl">
    <h3 className="mb-8 text-3xl font-semibold">Payment Successful!</h3>
    <p className="text-lg">
      Your payment of £{transactionDetails.amount} has been processed
      successfully. Order ID: {transactionDetails.orderId}
    </p>
    <p className="mt-2 text-lg">
      You will receive an email and text confirmation shortly.
    </p>

    <div className="mt-16 text-left">
      <h2 className="mb-6 text-2xl font-semibold">Booking Details</h2>
      <div className="space-y-1 text-lg text-left">
        <p>
          <strong>Name:</strong> {bookingDetails.FullName}
        </p>
        <p>
          <strong>Email:</strong> {bookingDetails.Email}
        </p>
        <p>
          <strong>Telephone:</strong> {bookingDetails.Telephone}
        </p>
        <p>
          <strong>Deposit Amount:</strong> £{bookingDetails.DepositAmount}
        </p>
        <p>
          <strong>Payment Date:</strong>{" "}
          {new Date(transactionDetails.timestamp).toLocaleString()}
        </p>
        <p>
          <strong>Payment Status:</strong> {transactionDetails.status}
        </p>
      </div>
    </div>

    <div className="p-4 mt-8 rounded-lg bg-blue-50">
      <p className="text-blue-800">
        Please keep this information for your records. A confirmation email has
        been sent to {bookingDetails.Email}
      </p>
    </div>
  </div>
);

Stage4ConfirmationDesktop.propTypes = {
  bookingDetails: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
    DepositAmount: PropTypes.string.isRequired,
  }).isRequired,
  transactionDetails: PropTypes.object.isRequired,
};

export default Stage4ConfirmationDesktop;
