import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Stage1BookingFormDesktop from "../booking/Stage1BookingFormDesktop";
import Stage2PaymentDesktop from "../payment/Stage2PaymentDesktop";
import Stage3ConfirmationDesktop from "../payment/Stage3ConfirmationDesktop";

const PaymentFlow = ({ trader }) => {
  const [stage, setStage] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    FullName: "",
    Email: "",
    Telephone: "",
    DepositAmount: "60.00",
    TraderName: trader?.name || "",
  });
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleBookingSubmit = (details) => {
    console.log("Booking details received:", details);
    setBookingDetails(details);
    setStage(2);
  };

  const handlePaymentSuccess = (transaction) => {
    console.log("Transaction details:", transaction);
    setTransactionDetails(transaction);
    setStage(3);
  };

  const handlePaymentError = () => {
    setStage(2);
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <Stage1BookingFormDesktop
            bookingDetails={bookingDetails}
            onNextStep={handleBookingSubmit}
          />
        );
      case 2:
        return (
          <Stage2PaymentDesktop
            bookingDetails={{
              ...bookingDetails,
              TraderName: trader?.name || "",
            }}
            trader={trader}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        );
      case 3:
        return (
          <Stage3ConfirmationDesktop
            bookingDetails={{
              ...bookingDetails,
              TraderName: trader?.name || "",
            }}
            trader={trader}
            transactionDetails={transactionDetails}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderStage()}</>;
};

PaymentFlow.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaymentFlow;
