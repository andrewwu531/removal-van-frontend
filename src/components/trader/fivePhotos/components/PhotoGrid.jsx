import PropTypes from "prop-types";
import ImageWithFallback from "../../../common/image/ImageWithFallback";
import { getImageUrl } from "../utils/imageUtils";

export default function PhotoGrid({ photos, traderName }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {photos.map((photo, index) => (
        <div key={index} className="relative aspect-square">
          <ImageWithFallback
            src={getImageUrl(photo)}
            alt={`${traderName} photo ${index + 2}`}
            className={`absolute inset-0 object-cover w-full h-full ${
              index === 1 ? "rounded-tr-lg" : index === 3 ? "rounded-br-lg" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}

PhotoGrid.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  traderName: PropTypes.string.isRequired,
};
