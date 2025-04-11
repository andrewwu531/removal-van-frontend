import PropTypes from "prop-types";
import ImageWithFallback from "../../../common/image/ImageWithFallback";
import { getImageUrl } from "../utils/imageUtils";

export default function MainPhoto({ photo, altText }) {
  return (
    <div className="relative min-[500px]:aspect-square max-[500px]:aspect-[4/3]">
      <ImageWithFallback
        src={getImageUrl(photo)}
        alt={altText}
        className="absolute inset-0 object-cover w-full h-full rounded-xl min-[500px]:rounded-l-lg"
      />
    </div>
  );
}

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};
