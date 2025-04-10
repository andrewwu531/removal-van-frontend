import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "../fivePhotos/TraderFivePhotosDesktop";
import FormDesktop from "../../forms/layout/FormDesktop";
import NotFoundState from "./components/NotFoundState";

export default function TraderDetailsDesktop({
  traders,
  fetchTraders,
  setParentLoading,
}) {
  const { traderId } = useParams();
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeTrader = async () => {
      try {
        // Only set loading states if we don't have the trader yet
        if (!trader) {
          setIsLoading(true);
          setParentLoading(true);
        }
        setError(false);

        // First try to find in existing traders
        let currentTrader = traders.find((t) => t.id.toString() === traderId);

        // If not found, fetch all traders
        if (!currentTrader) {
          const allTraders = await fetchTraders({});
          if (!isMounted) return;
          currentTrader = allTraders.find((t) => t.id.toString() === traderId);
        }

        if (currentTrader && isMounted) {
          setTrader(currentTrader);
          // Only use setTimeout for initial load
          if (isLoading) {
            setTimeout(() => {
              if (isMounted) {
                setIsLoading(false);
                setParentLoading(false);
              }
            }, 500);
          } else {
            setIsLoading(false);
            setParentLoading(false);
          }
        } else if (isMounted) {
          setError(true);
          setIsLoading(false);
          setParentLoading(false);
        }
      } catch (err) {
        console.error("Error fetching trader:", err);
        if (isMounted) {
          setError(true);
          setIsLoading(false);
          setParentLoading(false);
        }
      }
    };

    initializeTrader();

    return () => {
      isMounted = false;
    };
  }, [traderId]); // Only depend on traderId changes

  // Show loading state
  if (isLoading) {
    return null;
  }

  // Show error state
  if (error || !trader) {
    return (
      <div className="container min-h-screen pb-20 mx-auto pt-45">
        <NotFoundState />
      </div>
    );
  }

  // Show trader details
  return (
    <div className="container min-h-screen pb-20 mx-auto pt-45">
      <TraderFivePhotosDesktop trader={trader} />
      <div className="flex flex-col min-[1339px]:flex-row gap-6 mx-auto max-w-[90%] min-[1423px]:max-w-[85%] min-[1920px]:max-w-[80%]">
        <div className="w-full min-[1339px]:w-[60%]">
          <div className="min-h-screen col-span-3 pb-16 bg-white rounded-lg">
            <TraderDetailsCardDesktop trader={trader} />
          </div>
        </div>
        <div className="w-full min-[1339px]:w-[40%]">
          <FormDesktop trader={trader} />
        </div>
      </div>
    </div>
  );
}

TraderDetailsDesktop.propTypes = {
  traders: PropTypes.array.isRequired,
  fetchTraders: PropTypes.func.isRequired,
  setParentLoading: PropTypes.func.isRequired,
};
