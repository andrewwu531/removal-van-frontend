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

  useEffect(() => {
    if (!traders || traders.length === 0) {
      setIsLoading(false);
      setParentLoading(false);
      return;
    }

    setIsLoading(true);
    setParentLoading(true);

    // Sort traders to prioritize Glasgow and Edinburgh
    const sorted = [...traders].sort((a, b) => {
      const aHasPriority = a.available_locations.some(
        (loc) =>
          loc.toLowerCase() === "glasgow" || loc.toLowerCase() === "edinburgh"
      );
      const bHasPriority = b.available_locations.some(
        (loc) =>
          loc.toLowerCase() === "glasgow" || loc.toLowerCase() === "edinburgh"
      );

      if (aHasPriority && !bHasPriority) return -1;
      if (!aHasPriority && bHasPriority) return 1;
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
