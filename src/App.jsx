import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Traders_Collections from "./components/Traders_Collections";
import TraderDetails from "./components/TraderDetails";
import HeaderSearchBarDesktop from "./components/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./components/HeaderServiceBarDesktop";
import Footer from "./components-backup/FooterDesktop";

function App() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [currentService, setCurrentService] = useState("Removal");
  const [currentLocation, setCurrentLocation] = useState("");
  const location = useLocation();

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
    // Check if we have a selected service or location from navigation
    if (location.state?.selectedService || location.state?.selectedLocation) {
      const newService = location.state?.selectedService || currentService;
      const newLocation = location.state?.selectedLocation || currentLocation;

      setCurrentService(newService);
      setCurrentLocation(newLocation);

      // Fetch traders with both service and location
      fetchTraders({
        service: newService,
        location: newLocation,
      });
    }
  }, [location]);

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/backend/traders`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Filter traders based on service type and location
      let filteredTraders = data.filter(
        (trader) => trader.removal_type === searchParams.service
      );

      if (searchParams.location) {
        filteredTraders = filteredTraders.filter((trader) =>
          trader.available_locations.includes(searchParams.location)
        );
      }
      console.log("Filtered traders: ", filteredTraders);
      setTraders(filteredTraders);
    } catch (error) {
      console.error("Error fetching traders:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {screenSize < 1024 ? (
        <Routes>
          <Route path="/" element={<div>mobile</div>} />
          <Route path="/:traderId" element={<TraderDetails />} />
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
                <div className="mt-48">
                  <Traders_Collections
                    traders={traders}
                    currentService={currentService}
                  />
                </div>
                <Footer />
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
                <div className="mt-48">
                  <TraderDetails />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
