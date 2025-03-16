import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TraderDetails() {
  const { traderId } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;
  if (!trader) return <div>Trader not found</div>;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="relative h-96">
          <img
            src={`${import.meta.env.VITE_API_URL}${trader.main_photo}`}
            alt={trader.name}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h1 className="mb-2 text-3xl font-bold">{trader.name}</h1>
          <h2 className="mb-4 text-xl text-gray-600">{trader.title}</h2>

          {/* Service Type */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Service Type</h3>
            <p>{trader.removal_type}</p>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Pricing</h3>
            <ul className="pl-5 list-disc">
              <li>Starting from: £{trader.from_price}</li>
              <li>Package A: £{trader.price_a}</li>
              <li>Package B: £{trader.price_b}</li>
              <li>Package C: £{trader.price_c}</li>
            </ul>
          </div>

          {/* Qualifications */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Qualifications</h3>
            <p>{trader.qualifications}</p>
          </div>

          {/* Service Descriptions */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Service Description</h3>
            <p>{trader.service_descriptions}</p>
          </div>

          {/* Available Locations */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Available Locations</h3>
            <p>{trader.available_locations.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
