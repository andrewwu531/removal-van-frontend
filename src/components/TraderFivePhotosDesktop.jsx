import React from "react";
import PropTypes from "prop-types";
import ImageWithFallback from "./ImageWithFallback";

const TraderFivePhotos = ({ trader }) => {
  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return "/fallback-image.png";

    // If it's already a full Azure URL, return it
    if (photoUrl.startsWith("https://")) return photoUrl;

    // If it's a relative path, construct the Azure URL
    if (photoUrl.startsWith("/media/")) {
      // Remove any duplicate 'traders' in the path
      const cleanPath = photoUrl
        .replace("/media/traders/traders/", "/traders/")
        .replace("/media/traders/", "/traders/");

      return `${import.meta.env.VITE_AZURE_STORAGE_URL}${cleanPath}`;
    }

    // If it's just a filename, construct the full path
    return `${import.meta.env.VITE_AZURE_STORAGE_URL}/traders/${photoUrl}`;
  };

  // Debug logging with more detail
  console.log("Trader data:", {
    id: trader.id,
    name: trader.name,
    photos: {
      photo1: trader.photo1,
      photo2: trader.photo2,
      photo3: trader.photo3,
      photo4: trader.photo4,
      photo5: trader.photo5,
    },
  });

  return (
    <div className="grid grid-cols-2 gap-2 p-4 mx-auto max-w-5/7 min-[1423px]:max-w-9/14 min-[1920px]:max-w-5/7">
      {/* Large photo on the left */}
      <div className="relative">
        <ImageWithFallback
          src={getImageUrl(trader.photo1)}
          alt={`${trader.name} photo 1`}
          className="absolute inset-0 object-cover w-full h-full rounded-l-lg"
        />
      </div>

      {/* 2x2 grid on the right */}
      <div className="grid grid-cols-2 gap-2">
        {/* Top row */}
        <div className="relative aspect-square">
          <ImageWithFallback
            src={getImageUrl(trader.photo2)}
            alt={`${trader.name} photo 2`}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="relative aspect-square">
          <ImageWithFallback
            src={getImageUrl(trader.photo3)}
            alt={`${trader.name} photo 3`}
            className="absolute inset-0 object-cover w-full h-full rounded-tr-lg"
          />
        </div>
        {/* Bottom row */}
        <div className="relative aspect-square">
          <ImageWithFallback
            src={getImageUrl(trader.photo4)}
            alt={`${trader.name} photo 4`}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="relative aspect-square">
          <ImageWithFallback
            src={getImageUrl(trader.photo5)}
            alt={`${trader.name} photo 5`}
            className="absolute inset-0 object-cover w-full h-full rounded-br-lg"
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
