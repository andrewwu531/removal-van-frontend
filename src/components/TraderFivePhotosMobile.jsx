import React from "react";
import PropTypes from "prop-types";

const TraderFivePhotos = ({ trader }) => {
  // Function to get the complete image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return "/fallback-image.png";
    return `${import.meta.env.VITE_API_URL}${photoPath}`;
  };

  return (
    <div className="grid max-w-13/20 min-[1423px]:max-w-3/4 grid-cols-2 gap-2 p-4 mx-auto h-[50vh]">
      {/* Large photo on the left */}
      <div className="h-full row-span-2">
        <img
          src={getImageUrl(trader.photo1)}
          alt={`${trader.name} photo 1`}
          className="object-cover w-full h-full rounded-l-xl rounded-r-lg max-h-[calc(50vh-2rem)]"
        />
      </div>

      {/* 2x2 grid on the right */}
      <div className="grid h-full grid-cols-2 gap-2 mt-1">
        {/* Top row */}
        <div className="h-[calc(25vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo2)}
            alt={`${trader.name} photo 2`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="h-[calc(25vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo3)}
            alt={`${trader.name} photo 3`}
            className="object-cover w-full h-full rounded-lg rounded-tr-xl"
          />
        </div>
        {/* Bottom row */}
        <div className="h-[calc(25vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo4)}
            alt={`${trader.name} photo 4`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="h-[calc(25vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo5)}
            alt={`${trader.name} photo 5`}
            className="object-cover w-full h-full rounded-lg rounded-br-xl"
          />
        </div>
      </div>
    </div>
  );
};

TraderFivePhotos.propTypes = {
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo1: PropTypes.string,
    photo2: PropTypes.string,
    photo3: PropTypes.string,
    photo4: PropTypes.string,
    photo5: PropTypes.string,
  }).isRequired,
};

export default TraderFivePhotos;
