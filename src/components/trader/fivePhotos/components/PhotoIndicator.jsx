import PropTypes from "prop-types";

export default function PhotoIndicator({ totalPhotos }) {
  return (
    <div className="relative px-5 py-2 text-sm text-white bg-black bg-opacity-50 rounded-full">
      <span>{totalPhotos} photos</span>
    </div>
  );
}

PhotoIndicator.propTypes = {
  totalPhotos: PropTypes.number.isRequired,
};
