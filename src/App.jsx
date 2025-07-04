import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TradersCollections from "./components/traders/TradersCollections";
import TraderDetailsDesktop from "./components/trader/details/TraderDetailsDesktop";
import emailjs from "@emailjs/browser";
import Layout from "./components/layout/Layout";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./components/seo/MetaTags";
import ScrollToTop from "./components/layout/footer/components/ScrollToTop";
import LegalStatementPage from "./components/layout/footer/components/LegalStatementPage";
import CookieBanner from "./components/layout/cookie/CookieBanner";
import FloatingButton from "./components/common/FloatingButton";
import ServiceFormSelector from "./components/forms/ServiceFormSelector";

const getServiceFromUrl = (urlService) => {
  // Special routes that should not be treated as services
  const specialRoutes = ["legal-statement"];
  if (specialRoutes.includes(urlService)) {
    return null;
  }

  // Mapping of URL formats to service names
  const urlToServiceMap = {
    removal: "Removal",
    painting: "Painting",
    "carpet-flooring": "Carpet & Flooring",
    "electricity-gas": "Electricity & Gas",
    "bathroom-kitchen": "Bathroom & Kitchen",
    "window-door": "Window & Door",
    "exterior-roofing": "Exterior & Roofing",
    "solar-panels": "Solar Panels",
    commercial: "Commercial Maintenance",
  };

  if (!urlService) return null; // Changed from "Removal" to null
  const normalizedUrl = urlService.toLowerCase().trim();
  return urlToServiceMap[normalizedUrl];
};

const getUrlFromService = (serviceName) => {
  // Special case for Commercial
  if (serviceName === "Commercial") {
    return "commercial-maintenance";
  }

  return serviceName.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");
};

function App() {
  const [traders, setTraders] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isCookiePopupOpen, setIsCookiePopupOpen] = useState(false);
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

      // Handle root path - show all services
      if (!path) {
        setCurrentService("All Services");
        try {
          await fetchTraders({}); // Fetch all traders without filtering
        } catch (error) {
          console.error("Error loading all traders:", error);
        }
        setIsDataReady(true);
        return;
      }

      // Get the service from URL
      const matchedService = getServiceFromUrl(serviceType);
      console.log("Initial URL path:", path);
      console.log("Initial service type:", serviceType);
      console.log("Matched service:", matchedService);

      // Set current service and fetch all traders (no filtering)
      if (matchedService) {
        setCurrentService(matchedService);
      }

      try {
        await fetchTraders({}); // Always fetch all traders
      } catch (error) {
        console.error("Error loading traders:", error);
      }

      setIsDataReady(true);
    };

    initializeFromUrl();
  }, []); // Run only once on mount

  // Update the URL effect to handle subsequent URL changes
  useEffect(() => {
    const handleUrlChange = async () => {
      const path = location.pathname.substring(1);

      // Handle root path
      if (!path) {
        setCurrentService("All Services");
        setIsDataReady(true);
        return;
      }

      const serviceType = path.split("/")[0];
      const matchedService = getServiceFromUrl(serviceType);

      // Update currentService if we have a valid service
      if (matchedService && matchedService !== currentService) {
        setCurrentService(matchedService);
      }

      // Always fetch all traders (no filtering)
      try {
        await fetchTraders({});
      } catch (error) {
        console.error("Error loading traders:", error);
      } finally {
        setIsDataReady(true);
      }
    };

    handleUrlChange();
  }, [location.pathname]);

  useEffect(() => {
    // Initialize EmailJS
    const initEmailJS = async () => {
      try {
        if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
          emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
          console.log("EmailJS initialized successfully");
          console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
          console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
          console.log(
            "Template ID:",
            import.meta.env.VITE_EMAILJS_ENQUIRY_TEMPLATE_ID
          );
        } else {
          console.error(
            "EmailJS public key not found in environment variables"
          );
        }
      } catch (error) {
        console.error("Error initializing EmailJS:", error);
      }
    };

    initEmailJS();
  }, []);

  useEffect(() => {
    // Check if we should show cookie popup on page load/refresh
    const hasAcceptedCookies = localStorage.getItem("cookieConsent");
    if (!hasAcceptedCookies) {
      setIsCookiePopupOpen(true);
    }
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

      // Remove filtering - just set all traders
      setTraders(data);
      return data;
    } catch (error) {
      console.error("Error fetching traders:", error);
      throw error;
    }
  };

  const handleCookiePopupClose = () => {
    setIsCookiePopupOpen(false);
    localStorage.setItem("cookieConsent", "true");
  };

  if (!isDataReady) {
    return null;
  }

  return (
    <HelmetProvider>
      <MetaTags />
      <Layout
        onSearch={handleSearch}
        onServiceSelect={handleServiceSelect}
        currentService={currentService}
        currentLocation={currentLocation}
        isLoading={loading}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <ServiceNavigation /> */}

                <TradersCollections
                  traders={traders}
                  onTraderSelect={handleTraderSelect}
                  loading={loading}
                  isDataReady={isDataReady}
                  setParentLoading={setLoading}
                  currentService={currentService}
                />
                <div className="mx-auto max-w-4xl">
                  <ServiceFormSelector currentService={currentService} />
                </div>
              </>
            }
          />
          <Route path="/legal-statement" element={<LegalStatementPage />} />
          <Route
            path="/:serviceType"
            element={
              <TraderDetailsDesktop
                traders={traders}
                onTraderSelect={handleTraderSelect}
                loading={loading}
                isDataReady={isDataReady}
                setParentLoading={setLoading}
                fetchTraders={fetchTraders}
              />
            }
          />
          <Route
            path="/:serviceType/:traderId"
            element={
              <TraderDetailsDesktop
                traders={traders}
                onTraderSelect={handleTraderSelect}
                loading={loading}
                isDataReady={isDataReady}
                setParentLoading={setLoading}
                fetchTraders={fetchTraders}
              />
            }
          />
        </Routes>
        <FloatingButton />
        <CookieBanner
          isOpen={isCookiePopupOpen}
          onClose={handleCookiePopupClose}
        />
        <ScrollToTop />
      </Layout>
    </HelmetProvider>
  );
}

export default App;
