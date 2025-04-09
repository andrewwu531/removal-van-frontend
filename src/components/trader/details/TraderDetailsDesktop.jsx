import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "../fivePhotos/TraderFivePhotosDesktop";
import FormDesktop from "../../forms/layout/FormDesktop";
import Layout from "../../layout/Layout";

export default function TraderDetailsDesktop({ traders, fetchTraders }) {
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
    <Layout>
      <div className="container min-h-screen pb-20 mx-auto pt-45">
        <TraderFivePhotosDesktop trader={trader} />
        <div className="flex flex-col min-[1339px]:flex-row gap-6 mx-auto max-w-[90%] min-[1423px]:max-w-[80%] min-[1920px]:max-w-[80%]">
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
    </Layout>
  );
}

TraderDetailsDesktop.propTypes = {
  traders: PropTypes.array.isRequired,
  fetchTraders: PropTypes.func.isRequired,
  setShowFooter: PropTypes.func.isRequired,
};

const TraderDetailsPage = () => {
  const { traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTraderDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/backend/traders/${traderId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-API-Key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTrader(data);
      } catch (error) {
        console.error("Error fetching trader details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (traderId) {
      fetchTraderDetails();
    }
  }, [traderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!trader) {
    return <div>Trader not found</div>;
  }

  return (
    <Layout>
      <div className="mt-41 min-[1339px]:mt-43 min-[1920px]:mt-48">
        <TraderDetailsDesktop trader={trader} />
      </div>
    </Layout>
  );
};
