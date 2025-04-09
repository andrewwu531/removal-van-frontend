import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import FormDesktop from "../../forms/layout/FormDesktop";
import TraderPhotosDesktop from "../fivePhotos/TraderFivePhotosDesktop";
import { apiService } from "../../../services/apiService";
import NotFoundState from "./components/NotFoundState";
import TraderInfo from "./components/TraderInfo";

export default function TraderDetailsDesktop({ onLoadingChange }) {
  const { traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [error, setError] = useState(null);

  const updateLoading = (newLoadingState) => {
    onLoadingChange?.(newLoadingState);
  };

  const fetchTraderDetails = async () => {
    try {
      updateLoading(true);
      setError(null);
      const response = await apiService.getTraderById(traderId);

      if (!response) {
        throw new Error("Trader not found");
      }

      setTrader(response);
    } catch (error) {
      console.error("Error fetching trader details:", error);
      setError(error.message);
    } finally {
      updateLoading(false);
    }
  };

  useEffect(() => {
    fetchTraderDetails();
  }, [traderId]);

  if (error || !trader) {
    return <NotFoundState />;
  }

  return (
    <div className="container min-h-screen pt-20 pb-20 mx-auto">
      <TraderPhotosDesktop trader={trader} />
      <div className="flex flex-col min-[1339px]:flex-row gap-6 mx-auto max-w-[90%] min-[1423px]:max-w-[85%] min-[1920px]:max-w-[80%]">
        <div className="w-full min-[1339px]:w-[60%]">
          <div className="min-h-screen col-span-3 pb-16 bg-white rounded-lg shadow-lg">
            <TraderInfo trader={trader} />
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
  onLoadingChange: PropTypes.func,
};

TraderDetailsDesktop.defaultProps = {
  onLoadingChange: () => {},
};
