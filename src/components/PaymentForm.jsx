import React, { useState } from "react";

import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalButtons,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
} from "@paypal/react-paypal-js";

const baseUrl = import.meta.env.VITE_BASE_URL;
const paymentApiUrl = import.meta.env.VITE_PAYMENT_API_URL;

export default function PaymentForm() {
  const [isPaying, setIsPaying] = useState(false);
  const [PaymentError, setPaymentError] = useState("");
  const initialOptions = {
    "client-id":
      //   "AdVTLtaahpyF5NOuaSQp7v8kajW1gcYCTtZ6wBGcGpaiC8vByUIw6S8Ap66m30Y2HbSoQduiXNS0vxll", // paypal
      "AdVTLtaahpyF5NOuaSQp7v8kajW1gcYCTtZ6wBGcGpaiC8vByUIw6S8Ap66m30Y2HbSoQduiXNS0vxll",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "GB",
    currency: "GBP",
    "data-page-type": "product-details",
    components: "buttons,card-fields",
    "data-sdk-integration-source": "developer-studio",
  };

  async function createOrder() {
    try {
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              sku: "1blwyeo8",
              quantity: 2,
            },
          ],
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      return `Could not initiate PayPal Checkout...${error}`;
    }
  }

  async function onApprove(data, actions) {
    try {
      const response = await fetch(
        `http://${paymentApiUrl}/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
      const errorDetail = orderData?.details?.[0];

      if (errorDetail || !transaction || transaction.status === "DECLINED") {
        // (2) Other non-recoverable errors -> Show a failure message
        let errorMessage;
        if (transaction) {
          errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
        } else if (errorDetail) {
          errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
        } else {
          errorMessage = JSON.stringify(orderData);
        }

        throw new Error(errorMessage);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
      }
    } catch (error) {
      return `Sorry, your transaction could not be processed...${error}`;
    }
  }

  function onError(error) {
    // Do something with the error from the SDK
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={{
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "pay",
        }}
      />

      <PayPalCardFieldsProvider
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          // Log the error to the console
          console.error("Card Fields Error:", err);
          // Option 1: Display the error message on the UI by setting state
          setPaymentError(err.message || "An error occurred.");
          console.log(PaymentError, "Hi");
        }}
        style={{
          input: {
            "font-size": "16px",
            "font-family": "courier, monospace",
            "font-weight": "lighter",
            color: "#ccc",
          },
          ".invalid": { color: "purple" },
        }}
      >
        <PayPalNameField
          style={{
            input: { color: "grey" },
            ".invalid": { color: "green" },
          }}
        />
        <PayPalNumberField />
        <PayPalExpiryField />
        <PayPalCVVField />

        {/* Custom client component to handle card fields submission */}
        <SubmitPayment isPaying={isPaying} setIsPaying={setIsPaying} />
      </PayPalCardFieldsProvider>
    </PayPalScriptProvider>
  );
}

const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }) => {
  const { cardFieldsForm, fields } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit({ billingAddress }).catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <div className="flex justify-center">
      <button
        className={
          !isPaying
            ? "px-12 py-3 font-medium text-md mt-5 text-black bg-green-500 rounded-xl hover:scale-103 "
            : "btn btn-primary"
        }
        style={{ float: "right" }}
        onClick={handleClick}
      >
        {isPaying ? <div className="spinner tiny" /> : "Pay"}
      </button>
    </div>
  );
};
