import PropTypes from "prop-types";
import ImageWithFallback from "../../common/image/ImageWithFallback";
import { getImageUrl } from "../utils/imageUtils";

export default function TraderCard({ trader, onClick }) {
  return (
    <div
      className="flex flex-col w-full pb-2 min-[600px]:pb-10 overflow-hidden transition-shadow bg-white cursor-pointer rounded-lg min-[600px]:rounded-2xl hover:shadow-lg"
      onClick={onClick}
    >
      <div className="overflow-hidden relative w-full aspect-square">
        <ImageWithFallback
          src={getImageUrl(trader.main_photo)}
          alt={trader.name}
          className="object-cover w-full h-full rounded-2xl transition-transform duration-300 ease-in-out hover:scale-102"
        />
        <div className="absolute left-0 min-[1920px]:-left-0.5 top-0 z-10">
          <span className="px-6.5 min-[1920px]:px-6.5 py-3 min-[1920px]:py-3 font-semibold text-white bg-black rounded-xl text-[15px] min-[1256px]:text-[16px] min-[1920px]:text-[17px] hidden min-[600px]:block">
            {trader.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow px-2.5 min-[1920px]:px-3.5 pt-3 min-[600px]:pt-4">
        <p className="max-[600px]:mt-1 mb-2.5 min-[600px]:mb-2 min-[1920px]:mb-4.5 text-md min-[600px]:text-lg font-semibold text-gray-700 ">
          {trader.title}
        </p>

        <div className="flex justify-between items-end mt-auto">
          <div className="flex-1 mr-4 hidden min-[600px]:block">
            <p className="text-md min-[1920px]:text-base text-gray-800 line-clamp-2">
              {trader.available_locations.join(", ")}
            </p>
          </div>
          <p className="text-sm min-[1920px]:text-base text-gray-800 underline whitespace-nowrap">
            From £{trader.from_price}
          </p>
        </div>
      </div>
    </div>
  );
}

TraderCard.propTypes = {
  trader: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    from_price: PropTypes.number.isRequired,
    main_photo: PropTypes.string,
    available_locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
