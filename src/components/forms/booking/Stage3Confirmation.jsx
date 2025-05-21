import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";

const Stage3Confirmation = ({ trader, formData, transactionId }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const hasSent = useRef(false);

  useEffect(() => {
    // Track conversion
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17012396077",
        value: formData.DepositAmount,
        currency: "GBP",
        transaction_id: transactionId,
      });
    }

    // Only send email once per confirmation
    if (hasSent.current) return;
    hasSent.current = true;

    const sendConfirmationEmails = async () => {
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

        // Log environment variables (without sensitive data)
        console.log("EmailJS Configuration:", {
          serviceId: serviceId ? "Set" : "Missing",
          templateId: templateId ? "Set" : "Missing",
          adminTemplateId: adminTemplateId ? "Set" : "Missing",
          publicKey: publicKey ? "Set" : "Missing",
          adminEmail: adminEmail ? "Set" : "Missing",
        });

        if (
          !serviceId ||
          !templateId ||
          !adminTemplateId ||
          !publicKey ||
          !adminEmail
        ) {
          throw new Error("Missing required EmailJS configuration");
        }

        const formattedDate = new Date(formData.Date).toLocaleString(
          undefined,
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        );

        const params = {
          name: formData.FullName,
          customer_email: formData.Email,
          telephone: formData.Telephone,
          company: trader.name,
          order_id: transactionId,
          date: formattedDate,
          amount: formData.DepositAmount,
        };

        console.log("Sending customer email to:", formData.Email);
        // Send to customers
        const customerResult = await emailjs.send(
          serviceId,
          templateId,
          {
            ...params,
            to_email: formData.Email,
            from_email: adminEmail,
          },
          publicKey
        );
        console.log("Customer email sent successfully:", customerResult);

        console.log("Sending admin email to:", adminEmail);
        // Send to admin
        const adminResult = await emailjs.send(
          serviceId,
          adminTemplateId,
          {
            ...params,
            to_email: adminEmail,
            from_email: adminEmail,
          },
          publicKey
        );
        console.log("Admin email sent successfully:", adminResult);

        setEmailSent(true);
      } catch (err) {
        console.error("EmailJS error details:", {
          message: err.message,
          text: err.text,
          status: err.status,
          stack: err.stack,
        });
        setError(
          `Failed to send confirmation email: ${err.message || "Unknown error"}. Please contact support at ${import.meta.env.VITE_ADMIN_EMAIL || "admin@trade-specialists.com"}`
        );
      }
    };

    sendConfirmationEmails();
  }, [formData, trader, transactionId]);

  useEffect(() => {
    console.log(
      "VITE_EMAILJS_PUBLIC_KEY in prod:",
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  }, []);

  return (
    <div className="px-6 pb-16 text-center">
      <h2 className="pt-8 mb-10 text-2xl font-semibold text-gray-700">
        Payment Successful!
      </h2>
      <p className="mb-8 text-lg text-gray-700">
        Your payment has been processed successfully.
        {emailSent ? (
          "You will receive an email confirmation shortly."
        ) : error ? (
          <span className="text-red-600"> {error}</span>
        ) : (
          "Sending confirmation email..."
        )}
      </p>

      <div className="p-6 space-y-1 text-lg text-left">
        <div>
          <strong>Name:</strong> {formData.FullName}
        </div>
        <div>
          <strong>Email:</strong> {formData.Email}
        </div>
        <div>
          <strong>Telephone:</strong> {formData.Telephone}
        </div>
        <div>
          <strong>Company:</strong> {trader.name}
        </div>
        <div>
          <strong>Date:</strong>{" "}
          {new Date(formData.Date).toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div>
          <strong>Amount:</strong> £{formData.DepositAmount}
        </div>
        {transactionId && (
          <div>
            <strong>Transaction ID:</strong> {transactionId}
          </div>
        )}
      </div>
    </div>
  );
};

Stage3Confirmation.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    telephone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  formData: PropTypes.object.isRequired,
  transactionId: PropTypes.string,
};

export default Stage3Confirmation;
