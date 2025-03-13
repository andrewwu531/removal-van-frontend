import React from "react";
import PropTypes from "prop-types";

const Stage4ConfirmationDesktop = ({ bookingDetails, transactionDetails }) => (
  <div className="flex flex-col p-12 px-24 text-center w-2xl ">
    <h3 className="mb-8 text-3xl font-semibold">Payment Successful!</h3>
    <p className="text-lg">
      Your payment of £{transactionDetails.amount} has been processed
      successfully with the order ID: {transactionDetails.captureID}. You will
      receive an email and text confirmation shortly.
    </p>
    <div className="mt-16 text-left">
      <h2 className="mb-6 text-2xl font-semibold">Booking Details</h2>
      <div className="space-y-1 text-lg text-left">
        <p>
          <strong>Name:</strong> &nbsp;{bookingDetails.FullName}
        </p>
        <p>
          <strong>Email:</strong> &nbsp;{bookingDetails.Email}
        </p>
        <p>
          <strong>Telephone:</strong> &nbsp;{bookingDetails.Telephone}
        </p>
        <p>
          <strong>Pickup Location:</strong> &nbsp;
          {bookingDetails.PickupLocation}
        </p>
        <p>
          <strong>Dropoff Location:</strong> &nbsp;
          {bookingDetails.DropoffLocation}
        </p>
        <p>
          <strong>Deposit Amount:</strong> &nbsp;{bookingDetails.DepositAmount}
        </p>
      </div>
    </div>
  </div>
);

Stage4ConfirmationDesktop.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  transactionDetails: PropTypes.object.isRequired,
};

export default Stage4ConfirmationDesktop;
