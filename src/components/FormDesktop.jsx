import React, { useState, useEffect } from "react";
import Stage1BookingFormDesktop from "./Stage1BookingFormDesktop";
import Stage2PaymentDesktop from "./Stage2PaymentDesktop";
import Stage4ConfirmationDesktop from "./Stage4ConfirmationDesktop";
import PropTypes from "prop-types";

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

  useEffect(() => {
    if (trader?.name) {
      setBookingDetails((prev) => ({
        ...prev,
        TraderName: trader.name,
      }));
    }
  }, [trader]);

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
          <Stage4ConfirmationDesktop
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
  trader: PropTypes.object.isRequired,
};

export default PaymentFlow;
