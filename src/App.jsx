import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import TradersCollectionsDesktop from "./components/traders/TradersCollectionsDesktop";
import TraderDetailsDesktop from "./components/trader/details/TraderDetailsDesktop";
import emailjs from "@emailjs/browser";
import Layout from "./components/layout/Layout";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./components/seo/MetaTags";
import ScrollToTop from "./components/layout/footer/components/ScrollToTop";
import LegalStatementPage from "./components/layout/footer/components/LegalStatementPage";
import PhoneNumberPopup from "./components/popup/PhoneNumberPopup";

const getServiceFromUrl = (urlService) => {
  // Special routes that should not be treated as services
  const specialRoutes = ["legal-statement"];
  if (specialRoutes.includes(urlService)) {
    return null;
  }

  // Mapping of URL formats to service names
  const urlToServiceMap = {
    removal: "Removal",
    "house-renovation": "House Renovation",
    painting: "Painting",
    "carpet-flooring": "Carpet & Flooring",
    "electricity-gas": "Electricity & Gas",
    "bathroom-kitchen": "Bathroom & Kitchen",
    "window-door": "Window & Door",
    "exterior-roofing": "Exterior & Roofing",
    "solar-panels": "Solar Panels",
    "commercial-maintenance": "Commercial Maintenance",
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
  const [currentService, setCurrentService] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Update the initialization effect
  useEffect(() => {
    const initializeFromUrl = async () => {
      setIsDataReady(false);
      const path = location.pathname.substring(1);
      const serviceType = path.split("/")[0];

      // Special case for legal-statement
      if (serviceType === "legal-statement") {
        // Don't change the current service when on legal-statement
        setIsDataReady(true);
        return;
      }

      // Get the service from URL or default to "Removal"
      const matchedService = getServiceFromUrl(serviceType);
      console.log("Initial URL path:", path);
      console.log("Initial service type:", serviceType);
      console.log("Matched service:", matchedService);

      // Only set current service and fetch traders if it's a valid service
      if (matchedService) {
        setCurrentService(matchedService);
        try {
          await fetchTraders({
            service: matchedService,
            location: currentLocation,
          });
        } catch (error) {
          console.error("Error loading initial traders:", error);
        }
      }
      setIsDataReady(true);
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

      // Always update currentService if we have a valid service
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
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSearch = async (searchParams) => {
    setIsDataReady(false);

    // Update current service if it's provided in search params
    if (searchParams.service) {
      setCurrentService(searchParams.service);
    }

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

  if (!isDataReady) {
    return null;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/removal" replace />} />
        <Route
          path="/legal-statement"
          element={
            <Layout
              showFooter={true}
              currentService={currentService}
              currentLocation={currentLocation}
              onSearch={handleSearch}
              onServiceSelect={handleServiceSelect}
              isLoading={false}
            >
              <LegalStatementPage />
            </Layout>
          }
        />
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
              <MetaTags service={currentService} location={currentLocation} />
              <div className="mt-41 min-[1339px]:mt-43 min-[1920px]:mt-48">
                <TradersCollectionsDesktop
                  traders={traders}
                  currentService={currentService}
                  onTraderSelect={handleTraderSelect}
                  setParentLoading={setLoading}
                />
              </div>
              <PhoneNumberPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
              />
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
    </HelmetProvider>
  );
}

export default App;
