import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TradersCollectionsDesktop from "./components/traders/TradersCollectionsDesktop";
import TraderDetailsDesktop from "./components/trader/details/TraderDetailsDesktop";
import emailjs from "@emailjs/browser";
import Layout from "./components/layout/Layout";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./components/seo/MetaTags";
import ScrollToTop from "./components/layout/footer/components/ScrollToTop";
import LegalStatementPage from "./components/layout/footer/components/LegalStatementPage";
import {
  trackPageView,
  trackTimeSpent,
  trackUserAction,
} from "./utils/analytics";

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
  const [hasRetried, setHasRetried] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Single initialization effect
  useEffect(() => {
    const initializeFromUrl = async () => {
      try {
        setIsDataReady(false);
        setLoading(true);
        const path = location.pathname.substring(1);
        const serviceType = path.split("/")[0];

        // Special case for legal-statement
        if (serviceType === "legal-statement") {
          setIsDataReady(true);
          setLoading(false);
          return;
        }

        // If we're on the root path, redirect to /removal
        if (!path || path === "/") {
          navigate("/removal", { replace: true });
          return;
        }

        // Get the service from URL or default to "Removal"
        const matchedService = getServiceFromUrl(serviceType);

        if (matchedService) {
          setCurrentService(matchedService);
          await fetchTraders({
            service: matchedService,
            location: currentLocation,
          });
        }

        setIsDataReady(true);
        setLoading(false);
      } catch (error) {
        console.error("Error during initialization:", error);

        // If we haven't retried yet, try one more time
        if (!hasRetried) {
          setHasRetried(true);
          setTimeout(() => {
            initializeFromUrl();
          }, 1000);
        } else {
          // If we've already retried, show the page anyway
          setIsDataReady(true);
          setLoading(false);
        }
      }
    };

    initializeFromUrl();
  }, [location.pathname]); // Only depend on location.pathname

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    // Track page view when component mounts
    trackPageView();

    // Start tracking time spent
    trackTimeSpent();

    // Track form interactions
    const trackFormInteractions = () => {
      const forms = document.querySelectorAll("form");
      forms.forEach((form) => {
        form.addEventListener("submit", () => {
          trackUserAction("form_submit", form.id || "unnamed_form");
        });
      });
    };

    // Track button clicks
    const trackButtonClicks = () => {
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          trackUserAction(
            "button_click",
            button.textContent || button.id || "unnamed_button"
          );
        });
      });
    };

    trackFormInteractions();
    trackButtonClicks();

    // Cleanup
    return () => {
      const forms = document.querySelectorAll("form");
      forms.forEach((form) => {
        form.removeEventListener("submit", () => {});
      });

      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        button.removeEventListener("click", () => {});
      });
    };
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

  // Show blank page during loading
  if (!isDataReady || loading) {
    return null;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
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
