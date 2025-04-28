import React, { useState } from "react";
import PropTypes from "prop-types";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Stage2Payment = ({
  trader,
  formData,
  onSuccess,
  processing,
  setProcessing,
}) => {
  const [message, setMessage] = useState("");

  // Use environment variable for PayPal client ID
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "GBP",
    components: "buttons",
  };

  return (
    <div className="px-6 text-center pb-14">
      <h2 className="pt-10 mb-10 text-2xl font-semibold text-gray-700">
        Book Appointment
      </h2>

      <PayPalScriptProvider options={initialOptions}>
        <div style={{ position: "relative", minHeight: 48, zIndex: 10 }}>
          {/* Show PayPalButtons only if not processing */}
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
                  const response = await fetch(orderUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
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
                        company: trader.name,
                        date: formData.Date,
                        amount: formData.DepositAmount,
                      },
                    }),
                  });

                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }

                  const orderData = await response.json();
                  console.log("PayPal orderData:", orderData);
                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    throw new Error("Could not create PayPal order");
                  }
                } catch (error) {
                  console.error("PayPal createOrder error:", error);
                  setMessage(
                    `Could not initiate PayPal Checkout: ${error.message || error}`
                  );
                  throw error; // Rethrow to let PayPal SDK handle the error
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
                      body: JSON.stringify({
                        userDetails: {
                          name: formData.FullName,
                          email: formData.Email,
                          telephone: formData.Telephone,
                          company: trader.name,
                          date: formData.Date,
                          amount: formData.DepositAmount,
                        },
                      }),
                    }
                  );
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
                    `Sorry, your transaction could not be processed: ${error.message || error}`
                  );
                }
              }}
              onCancel={() => {
                console.log("Payment cancelled");
                setMessage("Payment was cancelled. Please try again.");
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                setMessage(
                  `An error occurred with PayPal: ${err.message || "Unknown error"}`
                );
              }}
            />
          )}
          {/* Show custom processing button while processing */}
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
      </PayPalScriptProvider>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

Stage2Payment.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    telephone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  formData: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  processing: PropTypes.bool,
  setProcessing: PropTypes.func,
};

export default Stage2Payment;
