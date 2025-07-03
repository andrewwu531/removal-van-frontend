import PropTypes from "prop-types";
import { TraderPropType } from "../../types/trader.types";
import PhoneMessagingButton from "../../../common/PhoneMessagingButton";

export default function TraderInfo({ trader }) {
  return (
    <div className="px-11 min-[500px]:px-28 pt-5 min-[500px]:pt-13">
      <div className="flex flex-col min-[600px]:flex-row items-start min-[600px]:items-center justify-start gap-4 min-[600px]:gap-10 mb-4 min-[600px]:mb-5">
        <h1 className="text-3xl font-bold">{trader.name}</h1>
        <div className="hidden min-[600px]:block mt-1">
          <PhoneMessagingButton serviceType={trader.service_type} />
        </div>
      </div>

      <h2 className="text-xl text-gray-600">{trader.title}</h2>

      <div className="block min-[600px]:hidden mt-4 w-fit">
        <PhoneMessagingButton serviceType={trader.service_type} />
      </div>

      <div className="mt-10">
        <h3 className="mb-1 text-lg font-semibold">Service Type</h3>
        <p>{trader.service_type}</p>
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
