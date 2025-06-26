import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ServiceTitle from "./components/ServiceTitle";
import EmptyTradersList from "./components/EmptyTradersList";
import TraderCard from "./components/TraderCard";
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

  // Define the priority order for locations
  const locationPriority = [
    "edinburgh",
    "glasgow",
    "manchester",
    "london",
    "birmingham",
    "newcastle",
    "sheffield",
  ];

  useEffect(() => {
    if (!traders || traders.length === 0) {
      setParentLoading(false);
      return;
    }

    setParentLoading(true);

    // Sort traders based on location priority
    const sorted = [...traders].sort((a, b) => {
      // Get the highest priority location for each trader
      const getHighestPriorityLocation = (locations) => {
        const lowerCaseLocations = locations.map((loc) => loc.toLowerCase());
        for (const priorityLoc of locationPriority) {
          if (lowerCaseLocations.includes(priorityLoc)) {
            return priorityLoc;
          }
        }
        return null;
      };

      const aPriority = getHighestPriorityLocation(a.available_locations);
      const bPriority = getHighestPriorityLocation(b.available_locations);

      // If both have priority locations, compare their positions in the priority array
      if (aPriority && bPriority) {
        return (
          locationPriority.indexOf(aPriority) -
          locationPriority.indexOf(bPriority)
        );
      }

      // If only one has a priority location, it should come first
      if (aPriority) return -1;
      if (bPriority) return 1;

      // If neither has a priority location, maintain original order
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

  const handleTraderClick = (trader) => {
    onTraderSelect(trader);
    const urlServiceName = currentService
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-");
    navigate(`/${urlServiceName}/${trader.id}`);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="container mt-[170px] justify-center px-5 min-[600px]:px-12 py-6 min-[1423px]:py-8 mx-auto min-[500px]:max-w-19/20 min-[1339px]:max-w-11/12 min-[1920px]:max-w-5/6">
          <ServiceTitle currentService={currentService} />
          {sortedTraders.length === 0 ? (
            <EmptyTradersList />
          ) : (
            <div className="grid justify-center grid-cols-2 min-[600px]:grid-cols-4 gap-3.5 min-[600px]:gap-5">
              {sortedTraders.map((trader) => (
                <TraderCard
                  key={trader.id}
                  trader={trader}
                  onClick={() => handleTraderClick(trader)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile View - Similar to ServiceNavigation layout */}
      <div className="block md:hidden">
        <div className="flex flex-col px-6 pt-48 mx-auto md:px-10 md:pt-48">
          <ServiceTitle currentService={currentService} />
          {sortedTraders.length === 0 ? (
            <EmptyTradersList />
          ) : (
            <div className="grid grid-cols-2 gap-y-6 md:grid-cols-7 md:gap-y-6">
              {sortedTraders.map((trader) => (
                <div
                  key={trader.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleTraderClick(trader)}
                >
                  <div className="relative px-2 mb-3">
                    <div className="overflow-hidden w-full rounded-2xl border-2 border-gray-200 shadow-md transition-colors duration-200 aspect-square">
                      <img
                        src={getImageUrl(trader.main_photo)}
                        alt={trader.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3E%3C/tspan%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-center text-gray-700 transition-colors duration-200 text-[16px] sm:text-xl md:text-xl lg:text-xl xl:text-lg group-hover:text-blue-600">
                      {trader.name}
                    </span>
                    <p className="mt-1 text-sm text-gray-600">
                      From £{trader.from_price}
                    </p>
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
