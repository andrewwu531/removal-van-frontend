import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "../fivePhotos/TraderFivePhotosDesktop";
import BookingStageController from "../../forms/booking/BookingStageController";
import NotFoundState from "./components/NotFoundState";

export default function TraderDetailsDesktop({
  fetchTraders,
  setParentLoading,
}) {
  const { serviceType, traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const loadTraderData = async () => {
      try {
        setIsLoading(true);
        setParentLoading(true);
        setError(false);

        // Always fetch fresh data
        const allTraders = await fetchTraders({});

        if (!isMounted) return;

        let currentTrader = null;

        if (traderId) {
          // If traderId is provided, find the specific trader
          currentTrader = allTraders.find((t) => t.id.toString() === traderId);
        } else if (serviceType) {
          // If only serviceType is provided, find the first trader for that service
          const serviceTraders = allTraders.filter(
            (t) =>
              t.service_type
                .toLowerCase()
                .replace(/&/g, "")
                .replace(/\s+/g, "-") === serviceType
          );
          currentTrader = serviceTraders[0]; // Get the first trader for this service
        }

        if (currentTrader && isMounted) {
          setTrader(currentTrader);
          setIsLoading(false);

          // Wait for the next render cycle to ensure content is rendered
          requestAnimationFrame(() => {
            // Then wait 1 second before showing footer
            timeoutId = setTimeout(() => {
              if (isMounted) {
                setParentLoading(false);
              }
            }, 1000);
          });
        } else {
          setError(true);
          setIsLoading(false);
          setParentLoading(false);
        }
      } catch (err) {
        console.error("Error loading trader:", err);
        if (isMounted) {
          setError(true);
          setIsLoading(false);
          setParentLoading(false);
        }
      }
    };

    loadTraderData();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [serviceType, traderId]);

  if (isLoading) {
    return null;
  }

  if (error || !trader) {
    return (
      <div className="container pb-20 mx-auto min-h-screen pt-45">
        <NotFoundState />
      </div>
    );
  }

  return (
    <div className="container min-h-screen pb-14 min-[500px]:pb-20 mx-auto pt-44 min-[500px]:pt-45">
      <TraderFivePhotosDesktop trader={trader} />
      <div className="flex flex-col min-[1339px]:flex-row gap-6 mx-auto max-w-[90%] min-[1423px]:max-w-[85%] min-[1920px]:max-w-[80%]">
        <div className="w-full min-[1339px]:w-[60%]">
          <div className="min-[500px]:min-h-screen col-span-3 pb-4 min-[500px]:pb-16 bg-white rounded-lg">
            <TraderDetailsCardDesktop trader={trader} />
          </div>
        </div>
        <div className="w-full min-[1339px]:w-[40%]">
          <BookingStageController trader={trader} />
        </div>
      </div>
    </div>
  );
}

TraderDetailsDesktop.propTypes = {
  fetchTraders: PropTypes.func.isRequired,
  setParentLoading: PropTypes.func.isRequired,
};
