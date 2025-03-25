import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TradersCollectionsDesktop from "./components/TradersCollectionsDesktop";
import TraderDetailsDesktop from "./components/TraderDetailsDesktop";
import HeaderSearchBarDesktop from "./components/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./components/HeaderServiceBarDesktop";
import FooterDesktop from "./components/FooterDesktop";

import TradersCollectionsMobile from "./components/TradersCollectionsMobile";
import TraderDetailsMobile from "./components/TraderDetailsMobile";
import HeaderSearchBarMobile from "./components/HeaderSearchBarMobile";
import HeaderServiceBarMobile from "./components/HeaderServiceBarMobile";
import FooterMobile from "./components/FooterMobile";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [currentService, setCurrentService] = useState("Removal");
  const [currentLocation, setCurrentLocation] = useState("");
  const location = useLocation();
  const [paypalConfig, setPaypalConfig] = useState(null);
  const [error, setError] = useState(null);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Initial load with default values
    fetchTraders({ service: currentService, location: currentLocation });

    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch client token when component mounts
    const fetchClientToken = async () => {
      try {
        console.log("Fetching client token...");
        const response = await fetch(
          "http://localhost:3000/api/paypal/generate-client-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("PayPal configuration received:", data);

        setPaypalConfig({
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          "data-client-token": data.clientToken,
          "data-payment-method-token": data.paymentMethodToken,
          currency: "GBP",
          intent: "capture",
          components: "buttons",
          "disable-funding": "paylater,venmo",
          "merchant-id": "QNBAVMJUUYKP8",
        });
      } catch (error) {
        console.error("Error fetching PayPal configuration:", error);
      }
    };

    fetchClientToken();
  }, []);

  const handleSearch = (searchParams) => {
    setCurrentService(searchParams.service);
    setCurrentLocation(searchParams.location);
    fetchTraders(searchParams);
  };

  const handleServiceSelect = (serviceName) => {
    setCurrentService(serviceName);
    fetchTraders({ service: serviceName, location: currentLocation });
  };

  const fetchTraders = async (searchParams) => {
    try {
      console.log(
        "Fetching from:",
        `${import.meta.env.VITE_API_URL}/api/backend/traders`
      );
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/backend/traders`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-API-Key": import.meta.env.VITE_API_KEY,
          },
          mode: "cors",
          credentials: "omit",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Received data:", data);

      // Filter traders based on service type and location
      let filteredTraders = data.filter(
        (trader) => trader.removal_type === searchParams.service
      );

      if (searchParams.location) {
        filteredTraders = filteredTraders.filter((trader) =>
          trader.available_locations.includes(searchParams.location)
        );
      }
      setTraders(filteredTraders);
    } catch (error) {
      console.error("Error fetching traders:", error);
    }
  };

  // Show loading state
  if (!paypalConfig) {
    return <div>Loading payment system...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading payment system: {error}
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "GBP",
    intent: "capture",
    components: "buttons",
    "merchant-id": "QNBAVMJUUYKP8",
    "disable-funding": "paylater,venmo",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div>
        {screenSize < 1024 ? (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full bg-white z-100">
                    <HeaderSearchBarMobile
                      onSearch={handleSearch}
                      currentService={currentService}
                      currentLocation={currentLocation}
                    />
                    <HeaderServiceBarMobile
                      currentService={currentService}
                      onServiceSelect={handleServiceSelect}
                    />
                  </div>
                  <div className="mt-41 min-[1339px]:mt-43 min-[1920px]:mt-48">
                    <TradersCollectionsMobile
                      traders={traders}
                      currentService={currentService}
                    />
                  </div>
                  <FooterMobile />
                </>
              }
            />
            <Route
              path="/:traderId"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full bg-white z-100">
                    <HeaderSearchBarMobile
                      onSearch={handleSearch}
                      currentService={currentService}
                      currentLocation={currentLocation}
                    />
                    <HeaderServiceBarMobile
                      currentService={currentService}
                      onServiceSelect={handleServiceSelect}
                    />
                  </div>
                  <div className="mt-24">
                    <TraderDetailsMobile />
                  </div>
                  <FooterMobile />
                </>
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full bg-white z-100">
                    <HeaderSearchBarDesktop
                      onSearch={handleSearch}
                      currentService={currentService}
                      currentLocation={currentLocation}
                    />
                    <HeaderServiceBarDesktop
                      currentService={currentService}
                      onServiceSelect={handleServiceSelect}
                    />
                  </div>
                  <div className="mt-41 min-[1339px]:mt-43 min-[1920px]:mt-48">
                    <TradersCollectionsDesktop
                      traders={traders}
                      currentService={currentService}
                    />
                  </div>
                  <FooterDesktop />
                </>
              }
            />
            <Route
              path="/:traderId"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full bg-white z-100">
                    <HeaderSearchBarDesktop
                      onSearch={handleSearch}
                      currentService={currentService}
                      currentLocation={currentLocation}
                    />
                    <HeaderServiceBarDesktop
                      currentService={currentService}
                      onServiceSelect={handleServiceSelect}
                    />
                  </div>
                  <div className="mt-24 max-w-[100%] min-[1423px]:max-w-[90%] min-[1920px]:max-w-[85%] mx-auto">
                    <TraderDetailsDesktop />
                  </div>
                  <FooterDesktop />
                </>
              }
            />
          </Routes>
        )}
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
