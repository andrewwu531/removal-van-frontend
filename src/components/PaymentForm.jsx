import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalButtons,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
} from "@paypal/react-paypal-js";

const paymentApiUrl = import.meta.env.VITE_PAYMENT_API_URL;

console.log("🔎 Payment API URL:", paymentApiUrl);

export default function PaymentForm({ bookingDetails }) {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [formKey, setFormKey] = useState(0); // Force remount of card fields

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "GB",
    currency: "GBP",
    "data-page-type": "product-details",
    components: "buttons,card-fields",
    "data-sdk-integration-source": "developer-studio",
  };

  async function createOrder() {
    try {
      // Clear previous errors before starting a new order.
      setPaymentError("");
      console.log("VITE_PAYMENT_API_URL: 1", paymentApiUrl);
      console.log(
        "🔎 VITE_PAYPAL_CLIENT_ID:",
        import.meta.env.VITE_PAYPAL_CLIENT_ID
      );

      const response = await fetch(`${paymentApiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{ sku: "1blwyeo8", quantity: 2 }],
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

  // Inside PaymentForm component

  // Function to send the email confirmation
  async function sendEmailConfirmation(bookingDetails, transactionDetails) {
    try {
      const response = await fetch(
        `${paymentApiUrl}/api/send-confirmation-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingDetails,
            transactionDetails,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Email confirmation failed");
      }
      console.log("Email confirmation sent successfully", result);
    } catch (error) {
      console.error("Error sending email confirmation:", error);
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
      console.log("Payment capture JSON:", orderData);

      const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];

      if (!transaction) {
        throw new Error("No transaction details found.");
      }

      // Only consider the payment successful if status is "COMPLETED"
      if (transaction.status !== "COMPLETED") {
        throw new Error(`Transaction status is ${transaction.status}`);
      }

      console.log("Payment approved:", transaction);
      setTransactionDetails({
        orderID: data.orderID,
        captureID: transaction.id,
        amount: transaction.amount.value,
        currency: transaction.amount.currency_code,
      });
      setPaymentSuccess(true);

      // Trigger email confirmation after a successful payment
      sendEmailConfirmation(bookingDetails, {
        orderID: data.orderID,
        transactionID: transaction.id,
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
      // Force reinitialize the card fields to clear input
      setFormKey((prev) => prev + 1);
      return error;
    }
  }

  function onError(error) {
    console.error("Payment error:", error);
    console.log("Payment error details:", error);
    setPaymentError(
      "Payment was not approved successfully. Please check your card details and try again."
    );
    setIsPaying(false);
    // Force reinitialize card fields on error
    setFormKey((prev) => prev + 1);
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      {paymentSuccess && transactionDetails ? (
        <div className="p-6 text-center">
          <h3 className="mb-4 text-2xl font-bold">Payment Successful!</h3>
          <p>
            Your payment of £{transactionDetails.amount} has been processed
            successfully with the order ID: {transactionDetails.orderID}. You
            will receive an email and text confirmation shortly.
          </p>

          <div className="mt-15 space-y-0.5 text-left">
            <p>
              <strong>Full Name:</strong> {bookingDetails.FullName}
            </p>
            <p>
              <strong>Email:</strong> {bookingDetails.Email}
            </p>
            <p>
              <strong>Telephone:</strong> {bookingDetails.Telephone}
            </p>
            <p>
              <strong>Removal Address:</strong> {bookingDetails.RemovalAddress}
            </p>
            <p>
              <strong>Delivery Address:</strong>{" "}
              {bookingDetails.DeliveryAddress}
            </p>
            <p>
              <strong>Removal Type:</strong> {bookingDetails.RemovalType}
            </p>
            {bookingDetails.RemovalType === "Home" && (
              <p>
                <strong>Number of Bedrooms:</strong> {bookingDetails.Bedrooms}
              </p>
            )}
            {bookingDetails.RemovalType === "Business" && (
              <p>
                <strong>Number of Large Appliances:</strong>{" "}
                {bookingDetails.Appliances}
              </p>
            )}
            <p>
              <strong>Available Date:</strong> {bookingDetails.AvailableDate}
            </p>
            {bookingDetails.AdditionalInformation &&
              bookingDetails.AdditionalInformation.trim() !== "" && (
                <p>
                  <strong>Additional Information:</strong>{" "}
                  {bookingDetails.AdditionalInformation}
                </p>
              )}
          </div>
        </div>
      ) : (
        <>
          <div className="pb-6 text-center ">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Book Removal Appointment
            </h2>
          </div>

          <div className="relative">
            {!isPaying && (
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
            )}
            <PayPalCardFieldsProvider
              key={formKey}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={(err) => {
                console.error("Card Fields Error:", err);
                console.log("Card Fields error details:", err);
                setPaymentError(
                  "Payment was not approved successfully. Please check your card details and try again."
                );
                setIsPaying(false);
                // Force reinitialize the card fields to clear input
                setFormKey((prev) => prev + 1);
              }}
              style={{
                input: {
                  fontSize: "1rem", // Tailwind text-base
                  fontFamily: "monospace", // Tailwind font-mono
                  fontWeight: "300", // Tailwind font-light
                  color: "#9ca3af", // Tailwind text-gray-400
                  // backgroundColor: "#f3f4f6", // Tailwind bg-gray-100
                  border: "1px solid #d1d5db", // Tailwind border border-gray-300
                  borderRadius: "0.375rem", // Tailwind rounded-md
                  padding: "0.5rem", // Tailwind p-2
                },
                ".invalid": { color: "#a78bfa" }, // Tailwind purple-400
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

            {isPaying && !paymentSuccess && (
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
          {paymentError && (
            <div className="mt-4 text-center text-red-600">
              <p>{paymentError}</p>
            </div>
          )}
        </>
      )}
    </PayPalScriptProvider>
  );
}

const SubmitPayment = ({
  isPaying,
  setIsPaying,
  billingAddress,
  setPaymentError,
}) => {
  const { cardFieldsForm } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";
      throw new Error(childErrorMessage);
    }
    // Clear previous error before submission.
    setPaymentError("");
    const formState = await cardFieldsForm.getState();
    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);
    cardFieldsForm.submit({ billingAddress }).catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <div className="flex justify-center">
      <button
        className={
          !isPaying
            ? "px-12 py-3 font-medium text-md mt-5 text-black bg-green-500 rounded-xl hover:scale-105"
            : "btn btn-primary"
        }
        style={{ float: "right" }}
        onClick={handleClick}
      >
        {isPaying ? (
          <div className="spinner tiny">
            <svg
              className="inline-block w-6 h-6 text-white animate-spin"
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
        ) : (
          "Pay"
        )}
      </button>
    </div>
  );
};

SubmitPayment.propTypes = {
  isPaying: PropTypes.bool.isRequired,
  setIsPaying: PropTypes.func.isRequired,
  billingAddress: PropTypes.object,
  setPaymentError: PropTypes.func.isRequired,
};

PaymentForm.propTypes = {
  bookingDetails: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
    RemovalAddress: PropTypes.string.isRequired,
    DeliveryAddress: PropTypes.string.isRequired,
    RemovalType: PropTypes.string.isRequired,
    Bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Appliances: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    AvailableDate: PropTypes.string.isRequired,
    AdditionalInformation: PropTypes.string.isRequired,
  }).isRequired,
};
