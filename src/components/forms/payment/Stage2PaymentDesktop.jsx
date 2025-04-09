import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import PaymentFormFields from "./components/PaymentFormFields";
import { formatCardNumber, formatExpiryDate } from "../utils/formUtils";

export default function Stage2PaymentDesktop({
  bookingDetails,
  trader,
  onPaymentSuccess,
  onPaymentError,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    console.log("Current bookingDetails:", bookingDetails);
    if (!bookingDetails || !bookingDetails.FullName) {
      console.error("Invalid booking details:", bookingDetails);
      setError("Missing booking information");
    }
  }, [bookingDetails]);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const convertExpiryDateFormat = (mmyy) => {
    if (!mmyy || mmyy.length !== 5) return "";
    const [month, year] = mmyy.split("/");
    return `20${year}-${month}`;
  };

  const validateForm = () => {
    if (!cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      setError("Please enter a valid 16-digit card number");
      return false;
    }

    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setError("Please enter a valid expiry date (MM/YY)");
      return false;
    }

    if (!cvv.match(/^\d{3,4}$/)) {
      setError("Please enter a valid CVV");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const requestId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      console.log("Sending payment request...");

      const response = await fetch(
        `${import.meta.env.VITE_PAYMENT_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "PayPal-Request-Id": requestId,
          },
          credentials: "include",
          body: JSON.stringify({
            bookingDetails: {
              FullName: bookingDetails.FullName,
              Email: bookingDetails.Email,
              Telephone: bookingDetails.Telephone,
              DepositAmount: "1.00",
              Date: bookingDetails.Date,
              TraderName: bookingDetails.TraderName,
            },
            paymentDetails: {
              payment_source: {
                card: {
                  number: cardNumber.replace(/\s/g, ""),
                  expiry: convertExpiryDateFormat(expiryDate),
                  security_code: cvv,
                  name: bookingDetails.FullName,
                  billing_address: {
                    address_line_1: "123 Test Street",
                    admin_area_2: "London",
                    postal_code: "SW1A 1AA",
                    country_code: "GB",
                  },
                },
              },
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Payment failed");
      }

      console.log("Payment successful:", data);

      // Send confirmation emails after successful payment
      await sendConfirmationEmails(data, bookingDetails);

      onPaymentSuccess({
        orderId: data.id,
        status: data.status,
        amount: data.amount,
        bookingDetails: bookingDetails,
      });
    } catch (error) {
      console.error("Payment process failed:", error);
      setError(error.message || "Payment failed. Please try again.");
      onPaymentError();
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmationEmails = async (orderData, bookingDetails) => {
    try {
      const emailData = {
        customer_email: bookingDetails.Email,
        name: bookingDetails.FullName,
        order_id: orderData.id,
        amount: bookingDetails.DepositAmount,
        date: bookingDetails.Date
          ? new Date(bookingDetails.Date).toLocaleDateString()
          : "Not specified",
        telephone: bookingDetails.Telephone,
        company: trader?.name || bookingDetails.TraderName,
      };

      // Email to customer
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Email to admin
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Confirmation emails sent successfully");
    } catch (error) {
      console.error("Failed to send confirmation emails:", error);
    }
  };

  return (
    <div className="w-full mx-auto font-sans">
      <div className="px-4 pt-2 min-[2560px]:pt-6 bg-white rounded-lg shadow-lg">
        <h2 className="pt-18 mb-10 text-2xl min-[2560px]:text-3xl font-semibold text-gray-700 px-6">
          Payment Details
        </h2>

        {error && (
          <div className="p-3 px-6 mb-4 text-red-500 rounded bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-6 pb-16">
          <PaymentFormFields
            cardNumber={cardNumber}
            expiryDate={expiryDate}
            cvv={cvv}
            setCardNumber={setCardNumber}
            setExpiryDate={setExpiryDate}
            setCvv={setCvv}
            formatCardNumber={formatCardNumber}
            formatExpiryDate={formatExpiryDate}
          />

          <div className="p-4 mt-8 rounded-lg bg-blue-50">
            <p className="px-2 py-1 text-blue-800">
              Before booking an appointment, please contact us by phone or text
              via (+44) 7943 059 792 to confirm availability.
            </p>
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
    Date: PropTypes.string,
    TraderName: PropTypes.string,
  }).isRequired,
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
};
