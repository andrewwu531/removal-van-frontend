import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function App() {
  const initialOptions = {
    "client-id": "test",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "GB",
    currency: "GBP",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
            setMessage(
              "There was an error processing your payment. Please try again."
            );
          }}
          createOrder={async () => {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_PAYMENT_API_URL}/api/orders`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  // use the "body" param to optionally pass additional order information
                  // like product ids and quantities
                  body: JSON.stringify({
                    cart: [
                      {
                        id: "YOUR_PRODUCT_ID",
                        quantity: "YOUR_PRODUCT_QUANTITY",
                      },
                    ],
                  }),
                }
              );

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
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_PAYMENT_API_URL}/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const orderData = await response.json();
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
              } else {
                const transaction =
                  orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                  orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}<br />
                  <br />See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...<br /><br />${error}`
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default App;
