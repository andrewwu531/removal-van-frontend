import React from "react";
import PropTypes from "prop-types";

const TraderFivePhotos = ({ trader }) => {
  // Function to get the complete image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;
    return `${import.meta.env.VITE_API_URL}${photoPath}`;
  };

  return (
    <div className="grid max-w-6/7 min-[1339px]:max-w-5/7 min-[1423px]:max-w-13/16 min-[1423px]:mt-0.5 min-[1920px]:mt-3.5 mb-2 min-[1920px]:mb-3 grid-cols-2 gap-2 p-4 mx-auto h-[424px] min-[1920px]:h-[500px]">
      {/* Large photo on the left */}
      <div className="h-full row-span-2">
        <img
          src={getImageUrl(trader.photo1)}
          alt={`${trader.name} photo 1`}
          className="object-cover w-full h-full rounded-l-xl max-h-[400px] min-[1920px]:max-h-[476px]"
        />
      </div>

      {/* 2x2 grid on the right */}
      <div className="grid h-full grid-cols-2 gap-2">
        {/* Top row */}
        <div className="h-[197px] min-[1920px]:h-[235px]">
          <img
            src={getImageUrl(trader.photo2)}
            alt={`${trader.name} photo 2`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[197px] min-[1920px]:h-[235px]">
          <img
            src={getImageUrl(trader.photo3)}
            alt={`${trader.name} photo 3`}
            className="object-cover w-full h-full rounded-tr-xl"
          />
        </div>
        {/* Bottom row */}
        <div className="h-[197px] min-[1920px]:h-[235px]">
          <img
            src={getImageUrl(trader.photo4)}
            alt={`${trader.name} photo 4`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[197px] min-[1920px]:h-[235px]">
          <img
            src={getImageUrl(trader.photo5)}
            alt={`${trader.name} photo 5`}
            className="object-cover w-full h-full rounded-br-xl"
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
