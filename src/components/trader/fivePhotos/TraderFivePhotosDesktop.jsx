import { useState } from "react";
import PropTypes from "prop-types";
import MainPhoto from "./components/MainPhoto";
import PhotoGrid from "./components/PhotoGrid";
import PhotoModal from "./components/PhotoModal";
import PhotoIndicator from "./components/PhotoIndicator";
import { TraderPropType } from "../types/trader.types";
import { getImageUrl } from "./utils/imageUtils";

export default function TraderPhotos({ trader }) {
  const [showModal, setShowModal] = useState(false);

  const allPhotos = [
    getImageUrl(trader.photo1),
    getImageUrl(trader.photo2),
    getImageUrl(trader.photo3),
    getImageUrl(trader.photo4),
    getImageUrl(trader.photo5),
  ].filter(Boolean);

  const handlePhotoClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        className="grid min-[500px]:grid-cols-2 grid-cols-2 gap-2 p-4 mx-auto max-[500px]:px-12 min-[500px]:max-w-9/14 min-[1171px]:max-w-5/7 min-[1339px]:max-w-4/7 min-[1920px]:max-w-10/14 cursor-pointer"
        onClick={handlePhotoClick}
      >
        {/* Desktop View */}
        <div className="max-[500px]:hidden">
          <MainPhoto photo={trader.photo1} altText={`${trader.name} photo 1`} />
        </div>
        <div className="max-[500px]:hidden relative">
          <PhotoGrid
            photos={[
              trader.photo2,
              trader.photo3,
              trader.photo4,
              trader.photo5,
            ]}
            traderName={trader.name}
          />
          <div className="absolute bottom-3 right-3">
            <PhotoIndicator totalPhotos={allPhotos.length} />
          </div>
        </div>

        {/* Mobile View - Two square photos */}
        <div className="min-[500px]:hidden relative aspect-square">
          <img
            src={getImageUrl(trader.photo1)}
            alt={`${trader.name} photo 1`}
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="min-[500px]:hidden relative aspect-square">
          <img
            src={getImageUrl(trader.photo2)}
            alt={`${trader.name} photo 2`}
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
          />
          <div className="absolute bottom-1.5 right-1.5">
            <PhotoIndicator totalPhotos={allPhotos.length} />
          </div>
        </div>
      </div>

      {showModal && (
        <PhotoModal
          photos={allPhotos}
          traderName={trader.name}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

TraderPhotos.propTypes = {
  trader: TraderPropType.isRequired,
};
