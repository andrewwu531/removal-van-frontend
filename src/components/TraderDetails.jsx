import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormDesktop from "./FormDesktop";
import TraderDetailsCard from "./TraderDetailsCard";

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

  useEffect(() => {
    const fetchTraderDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/backend/trader/${traderId}/`
        );
        const data = await response.json();
        setTrader(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trader details:", error);
        setLoading(false);
      }
    };

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
    <div className="container px-4 py-8 mx-auto max-w-12/13">
      <div className="grid grid-cols-5 mx-auto gap-7 max-w-4/5">
        {/* Left side: Trader Details Card */}
        <TraderDetailsCard trader={trader} />

        {/* Right side: Booking Form */}
        <div className="col-span-2 p-6 bg-white rounded-lg shadow-lg">
          <FormDesktop />
        </div>
      </div>
    </div>
  );
}
