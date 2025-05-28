import PropTypes from "prop-types";
import { TraderPropType } from "../../types/trader.types";

export default function TraderInfo({ trader }) {
  const defaultMessage = `Hi Trade Specialists,

I would like to make a booking for a house/ business removal. Here are my details:

• Full Name:
• Email Address:
• Pickup Location:
• Destination Location:
• Preferred Removal Date(s):
• Number of Bedrooms/ Approximate Office Size for Removal:
• Photos of Furniture for Removal:

I am looking forward to your reply.

Thank you`;

  const handlePhoneClick = (e) => {
    e.preventDefault();
    const phoneNumber = "07943059792";
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.location.href = `sms:${phoneNumber}?body=${encodedMessage}`;
  };

  return (
    <div className="px-11 min-[500px]:px-16 pt-5 min-[500px]:pt-13">
      <div className="flex items-center gap-6 mb-5">
        <h1 className="text-3xl font-bold">{trader.name}</h1>
        <a
          href={`sms:07943059792?body=${encodeURIComponent(defaultMessage)}`}
          onClick={handlePhoneClick}
          className="px-4 py-2 mt-1 text-sm font-semibold text-white transition-all duration-300 ease-in-out bg-red-500 rounded-lg hover:bg-red-500 hover:scale-105"
        >
          07943 059 792
        </a>
      </div>
      <h2 className="text-xl text-gray-600">{trader.title}</h2>

      <div className="mt-10">
        <h3 className="mb-1 text-lg font-semibold">Service Type</h3>
        <p>{trader.removal_type}</p>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Service Description</h3>
        <p>{trader.service_descriptions}</p>
      </div>

      {/* <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Qualifications</h3>
        <p>{trader.qualifications}</p>
      </div> */}

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Pricing</h3>
        <div className="whitespace-pre-line">{trader.pricing_descriptions}</div>
      </div>

      <div>
        <h3 className="mt-10 mb-1.5 text-lg font-semibold">
          Available Locations
        </h3>
        <p>{trader.available_locations.join(", ")}</p>
      </div>
    </div>
  );
}

TraderInfo.propTypes = {
  trader: TraderPropType.isRequired,
};
