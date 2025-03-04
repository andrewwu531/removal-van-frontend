import React, { useState } from "react";
import Stage1BookingFormDesktop from "./Stage1BookingFormDesktop";
import Stage2PaymentDesktop from "./Stage2PaymentDesktop";
import Stage3LoadingDesktop from "./Stage3LoadingDesktop";
import Stage4ConfirmationDesktop from "./Stage4ConfirmationDesktop";
import PaymentLayoutDesktop from "./PaymentLayoutDesktop";

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
          <Stage1BookingFormDesktop
            bookingDetails={bookingDetails}
            onNextStep={handleBookingSubmit}
          />
        );
      case 2:
        return (
          <Stage2PaymentDesktop
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        );
      case 3:
        return (
          <Stage4ConfirmationDesktop
            bookingDetails={bookingDetails}
            transactionDetails={transactionDetails}
          />
        );
      default:
        return null;
    }
  };

  return <PaymentLayoutDesktop>{renderStage()}</PaymentLayoutDesktop>;
};

export default PaymentFlow;
