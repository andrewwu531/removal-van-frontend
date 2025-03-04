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

const Stage2PaymentDesktop = ({ onPaymentSuccess, onPaymentError }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [formKey, setFormKey] = useState(0);

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
      // The loading overlay is triggered by isPaying
      cardFieldsForm.submit({ billingAddress: {} }).catch((err) => {
        setIsPaying(false);
      });
    };

    return (
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="px-12 py-3 mt-5 font-medium text-black bg-green-500 text-md rounded-xl hover:scale-105"
        >
          {isPaying ? "Processing..." : "Pay"}
        </button>
      </div>
    );
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="relative p-8 bg-white rounded-lg shadow">
        <h1 className="mb-6 text-3xl font-semibold text-center">
          Complete Your Payment
        </h1>
        {paymentError && (
          <div className="mt-4 text-center text-red-600">
            <p>{paymentError}</p>
          </div>
        )}
        <div className="mb-3">
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "pay",
            }}
          />
        </div>
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
              fontSize: "1rem",
              fontFamily: "monospace",
              fontWeight: "300",
              color: "#9ca3af",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              padding: "0.5rem",
            },
            ".invalid": { color: "#a78bfa" },
          }}
        >
          <div className="flex flex-col">
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
        {isPaying && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
            <svg
              className="w-10 h-10 text-green-500 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

Stage2PaymentDesktop.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
};

export default Stage2PaymentDesktop;
