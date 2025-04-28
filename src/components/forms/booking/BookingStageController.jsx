import React, { useState } from "react";
import Stage1BookingForm from "./Stage1BookingForm";
import Stage2Payment from "./Stage2Payment";
import Stage3Confirmation from "./Stage3Confirmation";
import PropTypes from "prop-types";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialPayPalOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "GBP",
  components: "buttons",
  debug: import.meta.env.DEV,
  "enable-funding": "card",
};

const BookingStageController = ({ trader }) => {
  const [stage, setStage] = useState("form"); // "form" | "payment" | "success"
  const [formData, setFormData] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [processing, setProcessing] = useState(false);

  // After booking details are submitteda
  const handleFormComplete = (data) => {
    setFormData(data);
    setStage("payment");
  };

  // After payment is successful
  const handlePaymentSuccess = (transactionId) => {
    setTransactionId(transactionId);
    setStage("success");
  };

  return (
    <div className="min-[1257px]:px-6 mt-10 min-[500px]:w-4/5 min-[500px]:mx-auto min-[1257px]:w-full">
      {stage === "form" && (
        <Stage1BookingForm trader={trader} onComplete={handleFormComplete} />
      )}
      {stage === "payment" && formData && (
        <PayPalScriptProvider options={initialPayPalOptions}>
          <Stage2Payment
            trader={trader}
            formData={formData}
            onSuccess={handlePaymentSuccess}
            processing={processing}
            setProcessing={setProcessing}
          />
        </PayPalScriptProvider>
      )}
      {stage === "success" && formData && (
        <Stage3Confirmation
          trader={trader}
          formData={formData}
          transactionId={transactionId}
        />
      )}
    </div>
  );
};

BookingStageController.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    telephone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};

export default BookingStageController;
