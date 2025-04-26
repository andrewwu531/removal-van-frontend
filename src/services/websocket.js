class PaymentWebSocket {
  constructor() {
    this.connect();
    this.handlers = new Set();
  }

  connect() {
    const wsUrl =
      import.meta.env.VITE_PAYMENT_WS_URL ||
      "wss://trade-specialists-payment.azurewebsites.net/ws";

    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "PAYMENT_COMPLETED") {
        this.handlers.forEach((handler) => handler(data.paymentData));
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket closed, reconnecting...");
      setTimeout(() => this.connect(), 5000);
    };
  }

  addHandler(handler) {
    this.handlers.add(handler);
  }

  removeHandler(handler) {
    this.handlers.delete(handler);
  }
}

export const paymentWs = new PaymentWebSocket();
