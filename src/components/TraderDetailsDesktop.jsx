import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormDesktop from "./FormDesktop";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "./TraderFivePhotosDesktop";
import { apiService } from "../services/apiService";
import Stage3LoadingDesktop from "./Stage3LoadingDesktop";

export default function TraderDetails({ onLoadingChange }) {
  const { traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNoTrader, setShowNoTrader] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const initialBookingDetails = {
    FullName: "",
    Email: "",
    Telephone: "",
    PickupLocation: "",
    DropoffLocation: "",
    DepositAmount: "£60",
  };

  const handleNextStep = (formData) => {
    console.log("Form data:", formData);
    // Handle the form submission here
  };

  const updateLoading = (newLoadingState) => {
    setLoading(newLoadingState);
    onLoadingChange?.(newLoadingState);
  };

  const fetchTraderDetails = async () => {
    try {
      updateLoading(true);
      const loadingTimeout = setTimeout(() => {
        setShowLoading(true);
      }, 3000);

      const trader = await apiService.getTraderById(traderId);
      clearTimeout(loadingTimeout);
      setTrader(trader);
      updateLoading(false);
    } catch (error) {
      console.error("Error fetching trader details:", error);
      updateLoading(false);
      setTimeout(() => {
        setShowNoTrader(true);
      }, 5000);
    }
  };

  useEffect(() => {
    fetchTraderDetails();
  }, [traderId]);

  if (loading || (!trader && !showNoTrader)) {
    if (!showLoading) {
      return null; // Return nothing for the first 3 seconds
    }
    return (
      <div className="container pt-20 pb-20 mx-auto">
        <Stage3LoadingDesktop />
      </div>
    );
  }

  if (!trader && showNoTrader) {
    return (
      <div className="container flex items-center justify-center min-h-screen pt-20 pb-20 mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Trader Not Found
          </h1>
          <p className="mt-2 text-gray-600">
            The trader you're looking for could not be found.
          </p>
          <a
            href="/"
            className="px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen pt-20 pb-20 mx-auto">
      <TraderFivePhotosDesktop trader={trader} />
      <div className="flex flex-col min-[1339px]:flex-row gap-6 mx-auto max-w-[90%] min-[1423px]:max-w-[85%] min-[1920px]:max-w-[80%]">
        {/* TraderDetailsCard */}
        <div className="w-full min-[1339px]:w-[60%]">
          <TraderDetailsCardDesktop trader={trader} />
        </div>

        {/* BookingForm */}
        <div className="w-full min-[1339px]:w-[40%]">
          <FormDesktop />
        </div>
      </div>
    </div>
  );
}
