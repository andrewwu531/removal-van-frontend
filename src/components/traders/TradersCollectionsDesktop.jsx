import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ServiceTitle from "./components/ServiceTitle";
import EmptyTradersList from "./components/EmptyTradersList";
import TraderCard from "./components/TraderCard";
import { useState, useEffect } from "react";
import { getImageUrl } from "./utils/imageUtils";

export default function TradersCollectionsDesktop({
  traders = [],
  currentService = "Removal",
  onTraderSelect,
  setParentLoading,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
      setParentLoading(false);
      return;
    }

    setIsLoading(true);
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
    ).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        setParentLoading(false);
      }, 100);
    });

    return () => {
      setIsLoading(true);
      setParentLoading(true);
    };
  }, [traders, setParentLoading]);

  useEffect(() => {
    console.log("TradersCollectionsDesktop received new traders:", traders);
    console.log("Current service:", currentService);
  }, [traders, currentService]);

  const handleTraderClick = (trader) => {
    onTraderSelect(trader);
    const urlServiceName = currentService
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-");
    navigate(`/${urlServiceName}/${trader.id}`);
  };

  return (
    <div>
      {!isLoading && (
        <div className="container justify-center px-5 min-[600px]:px-12 py-6 min-[1423px]:py-8 mx-auto min-[500px]:max-w-19/20 min-[1339px]:max-w-11/12 min-[1920px]:max-w-5/6">
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
      )}
    </div>
  );
}

TradersCollectionsDesktop.propTypes = {
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
