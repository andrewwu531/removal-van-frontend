import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "../fivePhotos/TraderFivePhotosDesktop";
import FormDesktop from "../../forms/layout/FormDesktop";

export default function TraderDetailsDesktop({
  traders,
  fetchTraders,
  setParentLoading,
}) {
  const { traderId } = useParams();
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    // Check if this is a page refresh
    const isPageRefresh = performance.navigation.type === 1;
    setIsRefresh(isPageRefresh);

    if (isPageRefresh) {
      // If it's a refresh, redirect to home using relative path in production
      const baseUrl =
        import.meta.env.MODE === "development" ? "http://localhost:5173" : "/"; // Using relative path for production
      window.location.href = baseUrl;
      return;
    }

    const initializeTrader = async () => {
      let currentTrader = traders.find((t) => t.id.toString() === traderId);

      if (!currentTrader) {
        const allTraders = await fetchTraders({});
        currentTrader = allTraders.find((t) => t.id.toString() === traderId);
      }

      if (currentTrader) {
        setTrader(currentTrader);
        setTimeout(() => {
          setIsLoading(false);
          setParentLoading(false);
        }, 500);
      } else {
        navigate("/");
      }
    };

    if (!isRefresh) {
      setIsLoading(true);
      setParentLoading(true);
      initializeTrader();
    }
  }, [traderId]);

  if (!trader || isLoading || isRefresh) {
    return null;
  }

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
