import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";

const Stage3Confirmation = ({ trader, formData, transactionId }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const hasSent = useRef(false);

  useEffect(() => {
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

        // Send to customer
        await emailjs.send(
          serviceId,
          templateId,
          {
            ...params,
            to_email: formData.Email,
            from_email: adminEmail,
          },
          publicKey
        );

        // Send to admin
        await emailjs.send(
          serviceId,
          adminTemplateId,
          {
            ...params,
            to_email: adminEmail,
            from_email: adminEmail,
          },
          publicKey
        );

        setEmailSent(true);
      } catch (err) {
        setError("Failed to send confirmation email. Please contact support.");
        console.error("EmailJS error:", err);
      }
    };

    sendConfirmationEmails();
  }, [formData, trader, transactionId]);

  return (
    <div className="px-6 pb-16 text-center">
      <h2 className="pt-8 mb-10 text-2xl font-semibold text-gray-700">
        Payment Successful!
      </h2>
      <p className="mb-8 text-lg text-gray-700">
        Your payment has been processed successfully. You will now receive an
        email confirmation and we will contact you shortly with the booking
        confirmation.
      </p>
      {error && <p className="text-red-600">{error}</p>}

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
