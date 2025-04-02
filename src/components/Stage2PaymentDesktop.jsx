import { useState, useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";
import {
  PayPalHostedFieldsProvider,
  PayPalHostedField,
} from "@paypal/react-paypal-js";

export default function Stage2PaymentDesktop({
  bookingDetails,
  onPaymentSuccess,
  onPaymentError,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("Current bookingDetails:", bookingDetails);
    if (!bookingDetails || !bookingDetails.FullName) {
      console.error("Invalid booking details:", bookingDetails);
      setIsError(true);
      setMessage("Missing booking information");
    }
  }, [bookingDetails]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Convert MM/YY to YYYY-MM format for PayPal
  const convertExpiryDateFormat = (mmyy) => {
    if (!mmyy || mmyy.length !== 5) return "";
    const [month, year] = mmyy.split("/");
    return `20${year}-${month}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create and capture order with direct bank details
      const response = await fetch(
        `${import.meta.env.VITE_PAYMENT_API_URL}/api/orders/direct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingDetails: {
              FullName: bookingDetails.FullName || "",
              Email: bookingDetails.Email || "",
              Telephone: bookingDetails.Telephone || "",
              DepositAmount: bookingDetails.DepositAmount || "60.00",
            },
            paymentDetails: {
              cardNumber: cardNumber.replace(/\s/g, ""),
              expiryDate: expiryDate,
              cvv: cvv,
            },
          }),
        }
      );

      const orderData = await response.json();

      if (orderData.status === "COMPLETED") {
        onPaymentSuccess({
          orderId: orderData.orderId,
          status: orderData.status,
          amount: bookingDetails.DepositAmount || "60.00",
          bookingDetails: bookingDetails,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Payment not completed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
      onPaymentError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto font-sans">
      <div className="px-6 pt-2 min-[2560px]:pt-6 bg-white rounded-lg shadow-lg">
        <h2 className="pt-18 mb-10 text-2xl min-[2560px]:text-3xl font-semibold text-gray-700 px-8">
          Payment Details
        </h2>

        {error && (
          <div className="p-3 px-8 mb-4 text-red-500 rounded bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-8 pb-16">
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength="19"
              required
            />
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex-1 mb-3">
              <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(formatExpiryDate(e.target.value))
                }
                placeholder="MM/YY"
                className="w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="5"
                required
              />
            </div>

            <div className="flex-1 mb-3">
              <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                placeholder="123"
                className="w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-10 mb-6 px-11 min-[2560px]:px-14 py-4.5 min-[2560px]:py-6 font-semibold text-lg min-[2560px]:text-xl text-white rounded-4xl focus:outline-none hover:scale-102 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Book Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

Stage2PaymentDesktop.propTypes = {
  bookingDetails: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
    DepositAmount: PropTypes.string.isRequired,
  }).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
};
