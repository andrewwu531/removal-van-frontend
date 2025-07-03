import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ServiceTitle from "./components/ServiceTitle";
import EmptyTradersList from "./components/EmptyTradersList";
import { useState, useEffect } from "react";
import { getImageUrl } from "./utils/imageUtils";

export default function TradersCollections({
  traders = [],
  currentService = "Removal",
  onTraderSelect,
  setParentLoading,
}) {
  const navigate = useNavigate();
  const [sortedTraders, setSortedTraders] = useState([]);
  const [showContent, setShowContent] = useState(false);

  // Define the service priority order
  const servicePriority = [
    "Removal Services",
    "Painting Services",
    "Carpet & Flooring",
    "Bathroom & Kitchen",
    "Window & Door",
    "Exterior & Roofing",
    "Solar Energy Solutions",
    "Commercial Maintenance",
  ];

  useEffect(() => {
    if (!traders || traders.length === 0) {
      setParentLoading(false);
      return;
    }

    setParentLoading(true);

    // Sort traders based on service priority
    const sorted = [...traders].sort((a, b) => {
      const aServiceIndex = servicePriority.indexOf(a.title);
      const bServiceIndex = servicePriority.indexOf(b.title);

      // If both services are in the priority list, sort by their position
      if (aServiceIndex !== -1 && bServiceIndex !== -1) {
        return aServiceIndex - bServiceIndex;
      }

      // If only one service is in the priority list, it should come first
      if (aServiceIndex !== -1) return -1;
      if (bServiceIndex !== -1) return 1;

      // If neither service is in the priority list, maintain original order
      return 0;
    });

    setSortedTraders(sorted);
    setParentLoading(false);

    // Load images in the background
    const imagesToLoad = sorted
      .map((trader) => getImageUrl(trader.main_photo))
      .filter(Boolean);

    Promise.all(
      imagesToLoad.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => {
              console.log("Failed to load image:", src);
              resolve();
            };
            img.src = src;
          })
      )
    ).catch((error) => {
      console.error("Error loading images:", error);
    });

    return () => {
      setParentLoading(false);
    };
  }, [traders, setParentLoading]);

  // Loading animation timing
  useEffect(() => {
    // Show content after 0.5s
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => {
      clearTimeout(contentTimer);
    };
  }, []);

  const handleTraderClick = (trader) => {
    onTraderSelect(trader);

    // Use the trader's service_type to determine the URL
    const traderServiceType = trader.service_type;

    // Map service_type to the correct URL paths
    const serviceUrlMap = {
      Removal: "removal",
      Painting: "painting",
      "Carpet & Flooring": "carpet-flooring",
      "Bathroom & Kitchen": "bathroom-kitchen",
      "Window & Door": "window-door",
      "Exterior & Roofing": "exterior-roofing",
      "Solar Panels": "solar-panels",
      "Commercial Maintenance": "commercial-maintenance",
    };

    const urlServiceName =
      serviceUrlMap[traderServiceType] ||
      traderServiceType.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");

    navigate(`/${urlServiceName}`);
  };

  // If content is not shown yet, render full-screen white background
  if (!showContent) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* This div takes up the full viewport */}
      </div>
    );
  }

  return (
    <>
      {/* Desktop View - Now using mobile layout */}
      <div className="hidden md:block">
        <div className="flex flex-col px-6 pt-48 mx-auto max-w-7xl md:px-16 lg:px-20 xl:px-20 md:pt-48">
          <ServiceTitle currentService={currentService} />
          {sortedTraders.length === 0 ? (
            <EmptyTradersList />
          ) : (
            <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-8">
              {sortedTraders.map((trader) => (
                <div
                  key={trader.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleTraderClick(trader)}
                >
                  <div className="relative mb-4 px-1.5 xl:px-2">
                    <div className="overflow-hidden w-full rounded-2xl border-2 border-gray-200 shadow-md transition-all duration-300 aspect-square">
                      <img
                        src={getImageUrl(trader.main_photo)}
                        alt={trader.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-102"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3E%3C/tspan%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                  <div className="px-2 text-center">
                    <span className="font-medium leading-tight text-gray-700 transition-colors duration-200 text-md sm:text-base md:text-lg xl:text-xl group-hover:text-gray-950">
                      {trader.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile View - Similar to ServiceNavigation layout */}
      <div className="block md:hidden">
        <div className="flex flex-col px-6 pt-48 mx-auto max-w-full">
          <ServiceTitle currentService={currentService} />
          {sortedTraders.length === 0 ? (
            <EmptyTradersList />
          ) : (
            <div className="grid grid-cols-2 gap-y-6">
              {sortedTraders.map((trader) => (
                <div
                  key={trader.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleTraderClick(trader)}
                >
                  <div className="relative px-2 mb-3">
                    <div className="overflow-hidden w-full rounded-2xl border-2 border-gray-200 shadow-md transition-all duration-300 aspect-square">
                      <img
                        src={getImageUrl(trader.main_photo)}
                        alt={trader.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3E%3C/tspan%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                  <div className="px-2 text-center">
                    <span className="text-sm font-medium leading-tight text-gray-700 transition-colors duration-200 sm:text-base md:text-lg lg:text-xl group-hover:text-blue-600">
                      {trader.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

TradersCollections.propTypes = {
  traders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      from_price: PropTypes.number.isRequired,
      main_photo: PropTypes.string,
      available_locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  currentService: PropTypes.string,
  onTraderSelect: PropTypes.func.isRequired,
  setParentLoading: PropTypes.func.isRequired,
};
