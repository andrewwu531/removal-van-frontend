import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function PayPalButton({ amount, onSuccess }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let script;
    const currentContainer = containerRef.current;

    function renderButton() {
      window.paypal
        .Buttons({
          createOrder: async function () {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_PAYMENT_URL}/api/create-paypal-order`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ amount }),
                }
              );
              const order = await res.json();
              return order.id;
            } catch (err) {
              console.error("PayPal createOrder error:", err);
            }
          },
          onApprove: async function (data) {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_PAYMENT_URL}/api/capture-paypal-order`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderID: data.orderID }),
                }
              );
              const details = await res.json();
              onSuccess(details);
            } catch (err) {
              console.error("PayPal onApprove error:", err);
            }
          },
        })
        .render(currentContainer);
    }

    if (!window.paypal) {
      script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=GBP`;
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [amount, onSuccess]);

  return <div ref={containerRef}></div>;
}

PayPalButton.propTypes = {
  amount: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PayPalButton;
