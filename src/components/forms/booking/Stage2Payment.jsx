import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Stage2Payment = ({
  trader,
  formData,
  onSuccess,
  processing,
  setProcessing,
}) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Log PayPal configuration in development
    if (import.meta.env.DEV) {
      console.log("PayPal config:", {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID ? "Set" : "Missing",
        paymentUrl: import.meta.env.VITE_PAYMENT_URL,
        mode: import.meta.env.MODE,
      });
    }
  }, []);

  return (
    <div className="px-6 text-center pb-14">
      <h2 className="pt-10 mb-10 text-2xl font-semibold text-gray-700">
        Book Appointment
      </h2>

      <div style={{ position: "relative", minHeight: 48, zIndex: 10 }}>
        {!processing && (
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "pay",
            }}
            createOrder={async () => {
              try {
                const baseUrl =
                  import.meta.env.VITE_PAYMENT_URL ||
                  "https://payment.trade-specialists.com";
                const orderUrl = `${baseUrl.replace(/\/+$/, "")}/api/orders`;

                console.log("Sending order request to:", orderUrl);

                const response = await fetch(orderUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include", // Include cookies if needed
                  body: JSON.stringify({
                    cart: [
                      {
                        name: "Deposit",
                        unitAmount: {
                          currencyCode: "GBP",
                          value: formData.DepositAmount,
                        },
                        quantity: "1",
                        description: "Booking deposit",
                        sku: "deposit",
                      },
                    ],
                    userDetails: {
                      name: formData.FullName,
                      email: formData.Email,
                      telephone: formData.Telephone,
                      company: trader?.name || "Trade Specialists",
                      date: formData.Date,
                      amount: formData.DepositAmount,
                    },
                  }),
                });

                // Improved error handling
                if (!response.ok) {
                  let errorDetails;
                  try {
                    // Try to parse error as JSON
                    errorDetails = await response.json();
                    console.error(
                      "Order creation failed:",
                      response.status,
                      errorDetails
                    );
                  } catch {
                    // If not JSON, get as text
                    const errorText = await response.text();
                    console.error(
                      "Order creation failed:",
                      response.status,
                      errorText
                    );
                    errorDetails = errorText;
                  }

                  throw new Error(
                    `HTTP error! Status: ${response.status}, Details: ${
                      typeof errorDetails === "object"
                        ? JSON.stringify(errorDetails)
                        : errorDetails
                    }`
                  );
                }

                const orderData = await response.json();
                console.log("PayPal orderData:", orderData);
                if (orderData.id) {
                  return orderData.id;
                } else {
                  throw new Error(
                    "Could not create PayPal order - no order ID returned"
                  );
                }
              } catch (error) {
                console.error("PayPal createOrder error:", error);
                setMessage(
                  `Could not initiate PayPal Checkout: ${error.message || String(error)}`
                );
                throw error;
              }
            }}
            onApprove={async (data, actions) => {
              setProcessing(true);
              try {
                const baseUrl =
                  import.meta.env.VITE_PAYMENT_URL ||
                  "https://payment.trade-specialists.com";
                const response = await fetch(
                  `${baseUrl.replace(/\/+$/, "")}/api/orders/${data.orderID}/capture`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // Include cookies if needed
                    body: JSON.stringify({
                      userDetails: {
                        name: formData.FullName,
                        email: formData.Email,
                        telephone: formData.Telephone,
                        company: trader?.name || "Trade Specialists",
                        date: formData.Date,
                        amount: formData.DepositAmount,
                      },
                    }),
                  }
                );

                if (!response.ok) {
                  const errorText = await response.text();
                  console.error(
                    "Payment capture failed:",
                    response.status,
                    errorText
                  );
                  throw new Error(
                    `HTTP error during capture! Status: ${response.status}, Details: ${errorText}`
                  );
                }

                const orderData = await response.json();

                const errorDetail = orderData?.details?.[0];
                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  setProcessing(false);
                  return actions.restart();
                } else if (errorDetail) {
                  setProcessing(false);
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else {
                  // Success!
                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];
                  setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}.`
                  );
                  onSuccess(transaction.id);
                }
              } catch (error) {
                setProcessing(false);
                console.error("PayPal onApprove error:", error);
                setMessage(
                  `Sorry, your transaction could not be processed: ${error.message || String(error)}`
                );
              }
            }}
            onCancel={() => {
              console.log("Payment cancelled by user");
              setMessage(
                "Payment was cancelled. Please try again when you're ready."
              );
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              setMessage(
                `Payment error: ${err.message || "Unknown error occurred"}`
              );
            }}
          />
        )}

        {processing && (
          <button
            type="button"
            disabled
            className="w-full py-3.5 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              zIndex: 10,
            }}
          >
            Processing bank details, please wait...
          </button>
        )}
      </div>

      {message && (
        <p
          className={`mt-4 ${message.includes("error") || message.includes("Sorry") ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

Stage2Payment.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    telephone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  formData: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  processing: PropTypes.bool,
  setProcessing: PropTypes.func,
};

Stage2Payment.defaultProps = {
  trader: null,
};

export default Stage2Payment;
