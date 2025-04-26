import emailjs from "@emailjs/browser";

export const sendConfirmationEmails = async (paymentData) => {
  try {
    emailjs.init(process.env.VITE_EMAILJS_PUBLIC_KEY);

    const emailData = {
      customer_email: paymentData.customerEmail,
      name: paymentData.customerName,
      order_id: paymentData.orderId,
      amount: paymentData.amount,
      date: paymentData.bookingDate,
      telephone: paymentData.telephone,
      company: paymentData.traderName,
    };

    // Send customer email
    await emailjs.send(
      process.env.VITE_EMAILJS_SERVICE_ID,
      process.env.VITE_EMAILJS_TEMPLATE_ID,
      emailData
    );

    // Send admin notification
    await emailjs.send(
      process.env.VITE_EMAILJS_SERVICE_ID,
      process.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
      emailData
    );

    console.log("Confirmation emails sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send confirmation emails:", error);
    return false;
  }
};
