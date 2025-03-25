import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Stage2PaymentDesktop() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log("Order created:", data);
      return data.id;
    } catch (error) {
      console.error("Error creating order:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data) => {
    try {
      setLoading(true);
      console.log("Capturing order:", data.orderID);

      const response = await fetch(
        `http://localhost:3000/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to capture order");
      }

      const orderData = await response.json();
      console.log("Payment successful:", orderData);

      // Handle success - you can redirect to a success page or update UI
      // window.location.href = '/payment-success';
    } catch (error) {
      console.error("Error capturing order:", error);
      setError("Failed to capture payment. Please try again.");
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

      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          console.error("PayPal error:", err);
          setError("PayPal payment failed. Please try again.");
        }}
        onCancel={() => {
          console.log("Payment cancelled");
          setError("Payment was cancelled. Please try again.");
        }}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "pay",
        }}
      />
    </div>
  );
}
