import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormDesktop from "./FormDesktop";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "./TraderFivePhotosDesktop";
import { apiService } from "../services/apiService";
import Stage3LoadingDesktop from "./Stage3LoadingDesktop";

export default function TraderDetails() {
  const { traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNoTrader, setShowNoTrader] = useState(false);

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

  const fetchTraderDetails = async () => {
    try {
      setLoading(true);
      const trader = await apiService.getTraderById(traderId);
      setTrader(trader);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trader details:", error);
      setLoading(false);
      // Start timer for showing no trader message
      setTimeout(() => {
        setShowNoTrader(true);
      }, 5000);
    }
  };

  useEffect(() => {
    fetchTraderDetails();
  }, [traderId]);

  if (loading || (!trader && !showNoTrader)) {
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
    <div className="container pt-20 pb-20 mx-auto">
      <TraderFivePhotosDesktop trader={trader} />
      <div className="flex flex-col min-[1339px]:flex-row gap-6 max-w-[95%] min-[1423px]:max-w-[90%] min-[1920px]:max-w-[85%] mx-auto">
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
