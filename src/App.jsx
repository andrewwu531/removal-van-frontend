import {
  Routes,
  Route,
  useLocation,
  useParams,
  useNavigate,
  Navigate,
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
import { serviceIcons } from "./components/layout/header/constants/serviceIcons";
import { serviceDisplayTitles } from "./components/traders/constants/serviceDisplayTitles";

// First, update the getServiceFromUrl function to handle the initial case
const getServiceFromUrl = (urlService) => {
  // Mapping of URL formats to service names
  const urlToServiceMap = {
    removal: "Removal",
    "house-renovation": "House Renovation",
    "carpet-flooring": "Carpet & Flooring",
    painting: "Painting",
    "damage-repair": "Damage Repair",
    "electricity-gas": "Electricity & Gas",
    "lock-smith": "Lock Smith",
    "solar-panels": "Solar Panels",
    "window-heating": "Window & Heating",
    car: "Car",
  };

  if (!urlService) return "Removal"; // Default case
  const normalizedUrl = urlService.toLowerCase().trim();
  return urlToServiceMap[normalizedUrl];
};

const getUrlFromService = (serviceName) => {
  return serviceName.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");
};

function App() {
  const [traders, setTraders] = useState([]);
  const [currentService, setCurrentService] = useState(null); // Initialize as null
  const [currentLocation, setCurrentLocation] = useState("");
  const [clientToken, setClientToken] = useState(null);
  const [showFooter, setShowFooter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Add a new effect to handle initial URL and service setup
  useEffect(() => {
    const initializeFromUrl = async () => {
      setIsDataReady(false);
      const path = location.pathname.substring(1);
      const serviceType = path.split("/")[0];

      // Get the service from URL or default to "Removal"
      const matchedService = getServiceFromUrl(serviceType);
      console.log("Initial URL path:", path);
      console.log("Initial service type:", serviceType);
      console.log("Matched service:", matchedService);

      setCurrentService(matchedService);

      try {
        await fetchTraders({
          service: matchedService,
          location: currentLocation,
        });
      } catch (error) {
        console.error("Error loading initial traders:", error);
      } finally {
        setIsDataReady(true);
      }
    };

    initializeFromUrl();
  }, []); // Run only once on mount

  // Update the URL effect to handle subsequent URL changes
  useEffect(() => {
    const handleUrlChange = async () => {
      const path = location.pathname.substring(1);

      if (!path) {
        navigate("/removal", { replace: true });
        return;
      }

      const serviceType = path.split("/")[0];
      const matchedService = getServiceFromUrl(serviceType);

      if (matchedService && matchedService !== currentService) {
        setIsDataReady(false);
        setCurrentService(matchedService);

        try {
          await fetchTraders({
            service: matchedService,
            location: currentLocation,
          });
        } catch (error) {
          console.error("Error loading traders:", error);
        } finally {
          setIsDataReady(true);
        }
      }
    };

    handleUrlChange();
  }, [location.pathname]);

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
    setIsDataReady(false);
    setCurrentLocation(searchParams.location);
    await fetchTraders(searchParams);
    setIsDataReady(true);
  };

  const handleServiceSelect = async (serviceName) => {
    // Don't do anything if we're already on this service
    if (currentService === serviceName) return;

    // Get URL format of the service name
    const urlServiceName = getUrlFromService(serviceName);

    // Update URL first
    navigate(`/${urlServiceName}`);

    // Update current service and fetch traders
    setCurrentService(serviceName);
    setIsDataReady(false);

    try {
      await fetchTraders({
        service: serviceName,
        location: currentLocation,
      });
    } catch (error) {
      console.error("Error fetching traders:", error);
    } finally {
      setIsDataReady(true);
    }
  };

  const handleTraderSelect = (selectedTrader) => {
    const urlServiceName = getUrlFromService(currentService);
    navigate(`/${urlServiceName}/${selectedTrader.id}`);
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
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received traders data:", data);

      let filteredTraders = data;

      if (searchParams?.service) {
        console.log("Filtering for service:", searchParams.service);
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
      throw error;
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

  if (!currentService || !isDataReady) {
    return null;
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Routes>
        <Route path="/" element={<Navigate to="/removal" replace />} />
        <Route
          path="/:serviceType"
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
          path="/:serviceType/:traderId"
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
