import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormDesktop from "./FormDesktop";
import TraderDetailsCardDesktop from "./TraderDetailsCardDesktop";
import TraderFivePhotosDesktop from "./TraderFivePhotosDesktop";
import { apiService } from "../services/apiService";

export default function TraderDetails() {
  const { traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const trader = await apiService.getTraderById(traderId);
      setTrader(trader);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trader details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraderDetails();
  }, [traderId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );

  if (!trader)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Trader not found</div>
      </div>
    );

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
