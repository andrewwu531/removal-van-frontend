import { useState, useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function Stage2PaymentDesktop({
  onPaymentSuccess,
  onPaymentError,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [{ isResolved }] = usePayPalScriptReducer();

  // Get the payment API URL from environment variables
  const paymentApiUrl = import.meta.env.VITE_PAYMENT_API_URL;

  useEffect(() => {
    console.log("Payment API URL:", paymentApiUrl);
  }, [paymentApiUrl]);

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
    setLoading(true);
    setError("");

    try {
      // Validate card details
      const formattedCardNumber = cardNumber.replace(/\s/g, "");
      const formattedExpiry = convertExpiryDateFormat(expiryDate);

      if (formattedCardNumber.length !== 16) {
        throw new Error("Invalid card number");
      }

      if (!formattedExpiry.match(/^\d{4}-\d{2}$/)) {
        throw new Error("Invalid expiry date format");
      }

      if (cvv.length < 3) {
        throw new Error("Invalid CVV");
      }

      // Create order
      console.log("Creating order...");
      const orderResponse = await fetch(`${paymentApiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const orderData = await orderResponse.json();
      console.log("Order created:", orderData.id);

      // Process payment
      console.log("Processing payment...");
      const paymentResponse = await fetch(`${paymentApiUrl}/api/process-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.id,
          cardDetails: {
            number: formattedCardNumber,
            expiry: formattedExpiry,
            cvv: cvv,
          },
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(
          paymentData.error || "Payment failed. Please check your card details."
        );
      }

      console.log("Payment successful:", paymentData);
      onPaymentSuccess(paymentData);
    } catch (error) {
      console.error("Payment error:", {
        message: error.message,
        stack: error.stack,
        apiUrl: paymentApiUrl,
      });
      setError(error.message);
      onPaymentError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 mx-auto">
      {error && (
        <div className="p-3 mb-4 text-red-500 rounded bg-red-50">{error}</div>
      )}

      {loading && (
        <div className="p-3 mb-4 text-gray-600 rounded bg-gray-50">
          Processing payment...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="4111 1111 1111 1111"
            className="w-full p-2 border rounded"
            maxLength="19"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              placeholder="MM/YY"
              className="w-full p-2 border rounded"
              maxLength="5"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              placeholder="123"
              className="w-full p-2 border rounded"
              maxLength="4"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
