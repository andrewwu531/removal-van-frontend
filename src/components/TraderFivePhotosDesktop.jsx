import React from "react";
import PropTypes from "prop-types";

const TraderFivePhotos = ({ trader }) => {
  // Function to get the complete image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;
    return `${import.meta.env.VITE_API_URL}${photoPath}`;
  };

  return (
    <div className="grid max-w-5/7 min-[1423px]:max-w-5/7 min-[1920px]:max-w-13/16 min-[1423px]:mt-0.5 min-[1920px]:mt-2.5 grid-cols-2 gap-2 p-4 mx-auto h-[55vh] min-[1423px]:h-[50vh]">
      {/* Large photo on the left */}
      <div className="h-full row-span-2">
        <img
          src={getImageUrl(trader.photo1)}
          alt={`${trader.name} photo 1`}
          className="object-cover w-full h-full rounded-l-lg max-h-[calc(55vh-2.85rem)] min-[1423px]:max-h-[calc(50vh-3.3rem)]"
        />
      </div>

      {/* 2x2 grid on the right */}
      <div className="grid h-full grid-cols-2 gap-2">
        {/* Top row */}
        <div className="h-[calc(27vh-1.5rem)] min-[1423px]:h-[calc(24vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo2)}
            alt={`${trader.name} photo 2`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[calc(27vh-1.5rem)] min-[1423px]:h-[calc(24vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo3)}
            alt={`${trader.name} photo 3`}
            className="object-cover w-full h-full rounded-tr-lg"
          />
        </div>
        {/* Bottom row */}
        <div className="h-[calc(27vh-1.5rem)] min-[1423px]:h-[calc(24vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo4)}
            alt={`${trader.name} photo 4`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[calc(27vh-1.5rem)] min-[1423px]:h-[calc(24vh-1.5rem)]">
          <img
            src={getImageUrl(trader.photo5)}
            alt={`${trader.name} photo 5`}
            className="object-cover w-full h-full rounded-br-lg"
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
