import { useState, useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";

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
  const [{ isResolved }] = usePayPalScriptReducer();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    console.log("Current bookingDetails:", bookingDetails);
    if (!bookingDetails || !bookingDetails.FullName) {
      console.error("Invalid booking details:", bookingDetails);
      setIsError(true);
      setMessage("Missing booking information");
    }
  }, [bookingDetails]);

  if (!isResolved) {
    return <div>Loading payment fields...</div>;
  }

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

    if (!bookingDetails) {
      console.error("No booking details available");
      setIsError(true);
      setMessage("Missing booking information");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Creating PayPal order with details:", bookingDetails);
      const response = await fetch(
        `${import.meta.env.VITE_PAYMENT_API_URL}/api/orders`,
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
            amount: "60.00",
            currency: "GBP",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to create order");
      }

      const orderData = await response.json();
      console.log("Order created:", orderData);

      if (orderData.id) {
        // Call onPaymentSuccess with all relevant details
        onPaymentSuccess({
          orderId: orderData.id,
          status: orderData.status,
          amount: "60.00",
          bookingDetails: bookingDetails,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("No order ID received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsError(true);
      setMessage(`Payment failed: ${error.message}`);
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

        {loading && (
          <div className="p-3 px-8 mb-4 text-gray-600 rounded bg-gray-50">
            Processing payment...
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
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
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
                className="w-full p-3 mt-1 bg-white border border-gray-300 rounded"
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
                className="w-full p-3 mt-1 bg-white border border-gray-300 rounded"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-10 mb-6 px-11 min-[2560px]:px-14 py-4.5 min-[2560px]:py-6 font-semibold text-lg min-[2560px]:text-xl text-white bg-red-500 rounded-4xl focus:outline-none hover:scale-102"
          >
            Book Now
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
