import React from "react";
import PropTypes from "prop-types";

const Stage4ConfirmationDesktop = ({ bookingDetails, transactionDetails }) => (
  <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
    <div className="px-6">
      <div className="mt-16">
        <h2 className="mb-16 text-3xl font-semibold text-center">
          Payment Successful!
        </h2>
        <h2 className="mb-5 text-2xl font-semibold">Booking Details</h2>
        <div className="space-y-1 text-lg">
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
            <strong>Appointment Date:</strong>{" "}
            {bookingDetails.Date
              ? new Date(bookingDetails.Date).toLocaleDateString()
              : "Not specified"}
          </p>
          <p>
            <strong>Order ID:</strong> {transactionDetails.orderId}
          </p>
          <p>
            <strong>Deposit Amount:</strong> £{transactionDetails.amount}
          </p>
        </div>
      </div>

      <div className="p-4 mt-12 mb-10 rounded-lg bg-blue-50">
        <p className="px-2 py-1 text-blue-800">
          We have now sent you a confirmation email to {bookingDetails.Email}.
          We will contact you in due course by phone and text to confirm the
          appointment in person.
        </p>
      </div>
    </div>
  </div>
);

Stage4ConfirmationDesktop.propTypes = {
  bookingDetails: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
    DepositAmount: PropTypes.string.isRequired,
    Date: PropTypes.instanceOf(Date),
  }).isRequired,
  transactionDetails: PropTypes.object.isRequired,
};

export default Stage4ConfirmationDesktop;
