import React from "react";
import PropTypes from "prop-types";

const Stage4ConfirmationDesktop = ({ bookingDetails, transactionDetails }) => (
  <div className="p-8 bg-white rounded-lg shadow">
    <h1 className="text-3xl font-semibold text-center text-green-600">
      Payment Approved!
    </h1>
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Booking Details</h2>
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
        <strong>Pickup Location:</strong> {bookingDetails.PickupLocation}
      </p>
      <p>
        <strong>Dropoff Location:</strong> {bookingDetails.DropoffLocation}
      </p>
      <p>
        <strong>Deposit Amount:</strong> {bookingDetails.DepositAmount}
      </p>
    </div>
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Transaction Details</h2>
      <p>
        <strong>Order ID:</strong> {transactionDetails.orderID}
      </p>
      <p>
        <strong>Capture ID:</strong> {transactionDetails.captureID}
      </p>
      <p>
        <strong>Amount:</strong> {transactionDetails.amount}{" "}
        {transactionDetails.currency}
      </p>
    </div>
  </div>
);

Stage4ConfirmationDesktop.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  transactionDetails: PropTypes.object.isRequired,
};

export default Stage4ConfirmationDesktop;
