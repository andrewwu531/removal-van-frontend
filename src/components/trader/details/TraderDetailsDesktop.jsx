import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "../fivePhotos/TraderFivePhotosDesktop";
import FormDesktop from "../../forms/layout/FormDesktop";

export default function TraderDetailsDesktop({
  traders,
  fetchTraders,
  setShowFooter,
}) {
  const { traderId } = useParams();
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTraderDetails = async () => {
      try {
        // First check if trader exists in current traders array
        const existingTrader = traders.find(
          (t) => t.id.toString() === traderId
        );

        if (existingTrader) {
          setTrader(existingTrader);
          setIsReady(true);
          return;
        }

        // If not found in current traders, fetch all traders
        const allTraders = await fetchTraders({});
        const foundTrader = allTraders.find(
          (t) => t.id.toString() === traderId
        );

        if (foundTrader) {
          setTrader(foundTrader);
          setIsReady(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error loading trader:", error);
        navigate("/");
      }
    };

    loadTraderDetails();
  }, [traderId, traders, fetchTraders, navigate]);

  if (!isReady || !trader) {
    return null;
  }

  return (
    <div className="container min-h-screen pt-20 pb-20 mx-auto">
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
  setShowFooter: PropTypes.func.isRequired,
};
