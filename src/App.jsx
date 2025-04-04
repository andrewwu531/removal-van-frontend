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

import PaymentSuccess from "./components/PaymentSuccess";
import PaymentError from "./components/PaymentError";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import emailjs from "@emailjs/browser";

function App() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [currentService, setCurrentService] = useState("Removal");
  const [currentLocation, setCurrentLocation] = useState("");
  const [clientToken, setClientToken] = useState(null);
  const [showFooter, setShowFooter] = useState(false);
  const [traderDetailsLoading, setTraderDetailsLoading] = useState(true);
  const location = useLocation();

  // Simplify the footer effect to only depend on trader details loading state
  useEffect(() => {
    if (location.pathname.match(/^\/\d+$/)) {
      // On trader details page, footer visibility depends on loading state
      setShowFooter(!traderDetailsLoading);
    } else {
      // On main page or other pages, show footer immediately
      setShowFooter(true);
    }
  }, [location.pathname, traderDetailsLoading]);

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
    const fetchClientToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PAYMENT_API_URL}/api/client-token`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClientToken(data.clientToken);
      } catch (error) {
        console.error("Error fetching client token:", error);
        setLoading(false);
      }
    };

    fetchClientToken();
  }, []);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
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

      let filteredTraders = data.filter(
        (trader) => trader.removal_type === searchParams.service
      );

      if (searchParams.location) {
        filteredTraders = filteredTraders.filter((trader) =>
          trader.available_locations.includes(searchParams.location)
        );
      }
      setTraders(filteredTraders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching traders:", error);
      setLoading(false);
    }
  };

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "GBP",
    intent: "capture",
    components: "buttons,hosted-fields",
    "data-client-token": clientToken,
    "enable-funding": "card",
    "disable-funding": "paylater,venmo",
  };

  // Handler for trader details loading state
  const handleTraderDetailsLoading = (isLoading) => {
    setTraderDetailsLoading(isLoading);
  };

  const handleTraderSelect = (selectedTrader) => {
    // You might want to store this in state if needed elsewhere
    console.log("Selected trader:", selectedTrader.name);
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
                  {showFooter && <FooterMobile />}
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
                  {showFooter && <FooterMobile />}
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
                      onTraderSelect={handleTraderSelect}
                    />
                  </div>
                  {showFooter && <FooterDesktop />}
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
                    <TraderDetailsDesktop
                      onLoadingChange={handleTraderDetailsLoading}
                    />
                  </div>
                  {showFooter && <FooterDesktop />}
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
