import {
  Routes,
  Route,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import TradersCollectionsDesktop from "./components/traders/TradersCollectionsDesktop";
import TraderDetailsDesktop from "./components/trader/details/TraderDetailsDesktop";
import HeaderSearchBarDesktop from "./components/layout/header/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./components/layout/header/HeaderServiceBarDesktop";
import FooterDesktop from "./components/layout/footer/FooterDesktop";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import emailjs from "@emailjs/browser";
import Layout from "./components/layout/Layout";

function App() {
  const [traders, setTraders] = useState([]);
  const [currentService, setCurrentService] = useState("Removal");
  const [currentLocation, setCurrentLocation] = useState("");
  const [clientToken, setClientToken] = useState(null);
  const [showFooter, setShowFooter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show footer on all pages except loading state of trader details
    setShowFooter(true);
  }, [location.pathname]);

  useEffect(() => {
    // Initial load with default values
    console.log("App mounted, initializing data...");
    const initializeData = async () => {
      await fetchTraders({
        service: currentService,
        location: currentLocation,
      });
      setIsDataReady(true);
      console.log("Initial data loaded");
    };
    initializeData();
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
        if (!data.success) {
          throw new Error("Failed to get client token");
        }

        setClientToken(data.data.clientToken);
      } catch (error) {
        console.error("Error fetching client token:", error);
        // Don't set loading to false here if you want to retry
      }
    };

    fetchClientToken();
  }, []);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSearch = async (searchParams) => {
    // Hide current content
    setIsDataReady(false);

    // Update state and fetch new data
    setCurrentService(searchParams.service);
    setCurrentLocation(searchParams.location);
    await fetchTraders(searchParams);

    // Show new content
    setIsDataReady(true);
  };

  const handleServiceSelect = async (serviceName) => {
    // Hide current content
    setIsDataReady(false);

    // Update state and fetch new data
    setCurrentService(serviceName);
    await fetchTraders({ service: serviceName, location: currentLocation });

    // Show new content
    setIsDataReady(true);
  };

  const fetchTraders = async (searchParams) => {
    console.log("Fetching traders with params:", searchParams);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/backend/traders`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-API-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received traders data:", data);

      let filteredTraders = data;

      if (searchParams?.service) {
        filteredTraders = filteredTraders.filter(
          (trader) => trader.removal_type === searchParams.service
        );
      }

      if (searchParams?.location) {
        filteredTraders = filteredTraders.filter((trader) =>
          trader.available_locations.includes(searchParams.location)
        );
      }

      console.log("Filtered traders:", filteredTraders);
      setTraders(filteredTraders);
      return filteredTraders;
    } catch (error) {
      console.error("Error fetching traders:", error);
      return [];
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

  const handleTraderSelect = (selectedTrader) => {
    // You can add any additional logic here if needed
    console.log("Selected trader:", selectedTrader.name);
  };

  // Don't render anything until initial data is ready
  if (!isDataReady) {
    console.log("App not ready yet");
    return null;
  }

  console.log("Rendering App with traders:", traders);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              showFooter={true}
              currentService={currentService}
              currentLocation={currentLocation}
              onSearch={handleSearch}
              onServiceSelect={handleServiceSelect}
              isLoading={loading}
            >
              <div className="mt-41 min-[1339px]:mt-43 min-[1920px]:mt-48">
                <TradersCollectionsDesktop
                  traders={traders}
                  currentService={currentService}
                  onTraderSelect={handleTraderSelect}
                  setParentLoading={setLoading}
                />
              </div>
            </Layout>
          }
        />
        <Route
          path="/:traderId"
          element={
            <Layout
              showFooter={true}
              currentService={currentService}
              currentLocation={currentLocation}
              onSearch={handleSearch}
              onServiceSelect={handleServiceSelect}
              isLoading={loading}
            >
              <TraderDetailsDesktop
                traders={traders}
                fetchTraders={fetchTraders}
                setParentLoading={setLoading}
              />
            </Layout>
          }
        />
      </Routes>
    </PayPalScriptProvider>
  );
}

export default App;
