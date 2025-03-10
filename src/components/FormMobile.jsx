import React, { useState } from "react";
import Stage1BookingFormMobile from "./Stage1BookingformMobile";
import Stage2PaymentMobile from "./Stage2PaymentMobile";
import Stage4ConfirmationMobile from "./Stage4ConfirmationMobile";
import PaymentLayoutMobile from "./PaymentLayoutMobile";

const PaymentFlow = () => {
  const [stage, setStage] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    FullName: "",
    Email: "",
    Telephone: "",
    PickupLocation: "",
    DropoffLocation: "",
    DepositAmount: "£60",
  });
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleBookingSubmit = (details) => {
    setBookingDetails(details);
    setStage(2);
  };

  const handlePaymentSuccess = (transaction) => {
    console.log(
      "Andrew BookingDetails: " + JSON.stringify(bookingDetails, null, 2)
    );

    setTransactionDetails(transaction);

    setStage(3);
  };

  const handlePaymentError = () => {
    // Optionally revert to payment stage so the customer can retry
    setStage(2);
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <Stage1BookingFormMobile
            bookingDetails={bookingDetails}
            onNextStep={handleBookingSubmit}
          />
        );
      case 2:
        return (
          <Stage2PaymentMobile
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        );
      case 3:
        return (
          <Stage4ConfirmationMobile
            bookingDetails={bookingDetails}
            transactionDetails={transactionDetails}
          />
        );
      default:
        return null;
    }
  };

  return <PaymentLayoutMobile>{renderStage()}</PaymentLayoutMobile>;
};

export default PaymentFlow;
