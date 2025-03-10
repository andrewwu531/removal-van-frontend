import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalCardFieldsProvider,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";

const Stage2PaymentMobile = ({ onPaymentSuccess, onPaymentError }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [formKey, setFormKey] = useState(0);

  // Spinner 3: Bouncing dots spinner
  const Spinner3 = () => (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 delay-150 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 delay-300 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  const paymentApiUrl = import.meta.env.VITE_PAYMENT_API_URL;
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "GBP",
    components: "buttons,card-fields",
    "enable-funding": "venmo",
  };

  async function createOrder() {
    try {
      setPaymentError("");
      const response = await fetch(`${paymentApiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{ sku: "1blwyeo8", quantity: 1 }],
        }),
      });
      const orderData = await response.json();
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Order creation error:", error);
      throw new Error(`Could not initiate PayPal Checkout: ${error}`);
    }
  }

  async function onApprove(data, actions) {
    try {
      const response = await fetch(
        `${paymentApiUrl}/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const orderData = await response.json();
      const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];

      if (!transaction) {
        throw new Error("No transaction details found.");
      }
      if (transaction.status !== "COMPLETED") {
        throw new Error(`Transaction status is ${transaction.status}`);
      }

      // Log transaction details to the console
      console.log("Transaction approved:", {
        orderID: data.orderID,
        captureID: transaction.id,
        amount: transaction.amount.value,
        currency: transaction.amount.currency_code,
      });

      onPaymentSuccess({
        orderID: data.orderID,
        captureID: transaction.id,
        amount: transaction.amount.value,
        currency: transaction.amount.currency_code,
      });
      return `Transaction ${transaction.status}: ${transaction.id}`;
    } catch (error) {
      console.error("Payment approval error:", error);
      setPaymentError(
        "Payment was not approved successfully. Please check your card details and try again."
      );
      setIsPaying(false);
      setFormKey((prev) => prev + 1);
      onPaymentError(error);
      return error;
    }
  }

  function onError(error) {
    console.error("Payment error:", error);
    setPaymentError(
      "Payment was not approved successfully. Please check your card details and try again."
    );
    setIsPaying(false);
    setFormKey((prev) => prev + 1);
    onPaymentError(error);
  }

  const SubmitPayment = ({ isPaying, setIsPaying, setPaymentError }) => {
    const { cardFieldsForm } = usePayPalCardFields();

    const handleClick = async () => {
      if (!cardFieldsForm) {
        throw new Error(
          "Unable to find any child components in the <PayPalCardFieldsProvider />"
        );
      }
      setPaymentError("");
      const formState = await cardFieldsForm.getState();
      if (!formState.isFormValid) {
        return alert("The payment form is invalid");
      }
      setIsPaying(true);
      // Submit the form while the fields remain mounted but are visually hidden
      cardFieldsForm.submit({ billingAddress: {} }).catch((err) => {
        setIsPaying(false);
      });
    };

    if (isPaying) return null;

    return (
      <div className="flex justify-center w-5/6 mx-auto">
        <button
          onClick={handleClick}
          className="px-16 py-4.5 mt-7 font-medium text-white bg-indigo-500 rounded-lg text-xl hover:scale-105"
        >
          Pay
        </button>
      </div>
    );
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="relative flex flex-col justify-center pt-2 mx-auto bg-white rounded-lg">
        {/* Always render these elements, but use the invisible class to hide them when isPaying is true */}
        <div
          className={`mb-10 text-2xl font-semibold text-center ${isPaying ? "invisible" : ""}`}
        >
          Complete Payment
        </div>
        {!isPaying && (
          <div className="flex flex-col justify-center w-full mx-auto mb-1">
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              style={{
                shape: "rect",
                layout: "vertical",
                color: "black",
                label: "pay",
              }}
            />
          </div>
        )}

        <PayPalCardFieldsProvider
          key={formKey}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            console.error("Card Fields Error:", err);
            setPaymentError(
              "Payment was not approved successfully. Please check your card details and try again."
            );
            setIsPaying(false);
            setFormKey((prev) => prev + 1);
          }}
          style={{
            input: {
              padding: "0.9rem", // Reduced padding shrinks the input's internal height
              border: "0.5px solid #9ca3af",
              borderRadius: "0.25rem",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "inherit",
              width: "100%",
            },
          }}
        >
          {/* Keep card fields mounted but hide them visually when isPaying is true */}
          <div
            className={`flex flex-col justify-center mx-auto space-y-[-7px] w-full ${isPaying ? "invisible" : ""}`}
          >
            <PayPalNumberField />
            <PayPalExpiryField />
            <PayPalCVVField />
          </div>
          <SubmitPayment
            isPaying={isPaying}
            setIsPaying={setIsPaying}
            setPaymentError={setPaymentError}
          />
        </PayPalCardFieldsProvider>

        {/* Spinner overlay visible only when isPaying is true */}
        {isPaying && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center mx-auto bg-white bg-opacity-75"
            style={{ top: "20%" }}
          >
            <Spinner3 />
          </div>
        )}
        {paymentError && (
          <div className="mx-3 mt-8 text-center text-red-600">
            <p>{paymentError}</p>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

Stage2PaymentMobile.propTypes = {
  isPaying: PropTypes.bool.isRequired,
  setIsPaying: PropTypes.func.isRequired,
  setPaymentError: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
};

export default Stage2PaymentMobile;
